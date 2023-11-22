import * as React from "react";
import Fuse from "fuse.js";
import {
  usePodcastPreviewStore,
  useSearchParamStore,
  ChipDataInterface,
} from "../store/storeIndex";
import { Podcast } from "../services/podcastInterfaces";
import { genres } from "../services/podcastAPICalls";

const FusySearch = () => {
  const { data } = usePodcastPreviewStore();
  const { chipData } = useSearchParamStore();
  const [finalResult, setFinalResult] = React.useState<Podcast[]>([]);

  React.useEffect(() => {
    // Fuse search options
    const searchOptions = {
      keys: ["title", "genres"],
      isCaseSensitive: false,
      shouldSort: true,
      includeScore: true,
      findAllMatches: true,
      threshold: 0.1,
    };

    // Extract labels from chip data
    const labelExtractor = (
      chipData: ChipDataInterface[],
      chipLabelExcluder: string[]
    ): string[] => {
      return chipData
        .map((chipData) => chipData.label)
        .filter((label) => !chipLabelExcluder.includes(label))
        .filter((label) => label !== "");
    };

    const chipLabelExcluder = ["A-Z", "Z-A", "Date Newest", "Date Oldest"];
    const extractedChipLabels = labelExtractor(chipData, chipLabelExcluder);

    // Filter labels into title and genres
    const filterLabels = (
      labels: string[],
      includeGenres: string[]
    ): { extractedTitle: string[]; extractedGenres: string[] } => {
      const result: { extractedTitle: string[]; extractedGenres: string[] } = {
        extractedTitle: [],
        extractedGenres: [],
      };

      labels.forEach((label: string) => {
        const isGenre = includeGenres.some((includeGenre: string) =>
          label.includes(includeGenre)
        );

        if (isGenre) {
          result.extractedGenres.push(label);
        } else {
          result.extractedTitle.push(label);
        }
      });

      return result;
    };

    const includeGenres = Object.values(genres);

    // Extracted title and genres from chip data
    const { extractedTitle, extractedGenres } = filterLabels(
      extractedChipLabels,
      includeGenres
    );

    console.log(
      "queries:",
      chipData,
      "\n titles:",
      extractedTitle,
      "\n genres:",
      extractedGenres
    );

    // Perform the search based on title
    const searchQueryTitle = {
      title: extractedTitle.join(" "),
    };

    console.log("searchquery title:", searchQueryTitle);

    const fuseTitle = new Fuse<Podcast>(data, searchOptions);
    const titleResults = fuseTitle.search(searchQueryTitle);
    console.log("Title results:", titleResults);

    // Perform the search based on genres only if there are genre queries
    let genreResults: Podcast[] = [];
    if (extractedGenres.length > 0) {
      const searchQueryGenre = {
        genres: extractedGenres.join(" "),
      };

      console.log("searchquery genres:", searchQueryGenre);
      // Use title results for genre search if available, otherwise use the entire dataset
      const dataForGenreSearch =
        titleResults.length > 0
          ? titleResults.map((result) => result.item)
          : data;

      const fuseGenre = new Fuse<Podcast>(dataForGenreSearch, searchOptions);
      genreResults = fuseGenre
        .search(searchQueryGenre)
        .map((result) => result.item);
    }

    console.log("Genre results:", genreResults);

    setFinalResult((prevResult: Podcast[]) => {
      if (genreResults.length > 0) {
        return [...genreResults];
      } else {
        return [...(titleResults.map((result) => result.item) as Podcast[])];
      }
    });
  }, [chipData]);

  React.useEffect(() => {
    const labelsToCheck = ["A-Z", "Z-A", "Date Newest", "Date Oldest"];
    const isZALabelPresent = chipData.some((chip) => chip.label === "Z-A");
    const isDateLabelPresent = chipData.some(
      (chip) => chip.label === "Date Newest"
    );

    if (
      labelsToCheck.some((label) =>
        chipData.some((chip) => chip.label === label)
      )
    ) {
      if (isZALabelPresent) {
        finalResult.sort((title1, title2) => {
          title1 = title1.title.toLocaleLowerCase();
          title2 = title2.title.toLocaleLowerCase();
          if (title1 < title2) {
            return 1;
          }
          if (title1 > title2) {
            return -1;
          }
          return 0;
        });
        console.log("sorted z-a");
      } else {
        finalResult.sort((title1, title2) => {
          title1 = title1.title.toLocaleLowerCase();
          title2 = title2.title.toLocaleLowerCase();
          if (title1 < title2) {
            return -1;
          }
          if (title1 > title2) {
            return 1;
          }
          return 0;
        });
      }

      let sortedResults = finalResult.slice();

      if (isDateLabelPresent) {
        sortedResults = sortedResults.sort((a, b) => {
          const dateA = new Date(a.updated).getTime();
          const dateB = new Date(b.updated).getTime();
          return dateB - dateA;
        });
      } else {
        sortedResults = sortedResults.sort((a, b) => {
          const dateA = new Date(a.updated).getTime();
          const dateB = new Date(b.updated).getTime();
          return dateA - dateB;
        });
      }

      setFinalResult(sortedResults);
    }
  }, [chipData]);

  // You can use finalResult in your component now
  console.log("Final results:", finalResult);

  return <div></div>;
};

export default FusySearch;
