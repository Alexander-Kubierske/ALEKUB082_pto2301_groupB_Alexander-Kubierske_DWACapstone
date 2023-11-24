import * as React from "react";
import Fuse from "fuse.js";
import {
  usePodcastPreviewStore,
  useSearchParamStore,
  ChipDataInterface,
} from "../store/storeIndex";
import { Podcast } from "../services/podcastInterfaces";
import { genres } from "../services/podcastAPICalls";
import SearchResultCards from "./SearchResultCards";

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

    // Perform the search based on title
    const searchQueryTitle = {
      title: extractedTitle.join(" "),
    };

    const fuseTitle = new Fuse<Podcast>(data, searchOptions);
    const titleResults = fuseTitle.search(searchQueryTitle);

    // Perform the search based on genres only if there are genre queries
    let genreResults: Podcast[] = [];
    if (extractedGenres.length > 0) {
      const searchQueryGenre = {
        genres: extractedGenres.join(" "),
      };

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
        const sortedFinalResultAscending = finalResult
          .slice()
          .sort((a, b) => b.title.localeCompare(a.title));
        console.log("a-z============> \n\n", sortedFinalResultAscending);
        setFinalResult(sortedFinalResultAscending);
      } else {
        const sortedFinalResultDescending = finalResult
          .slice()
          .sort((a, b) => a.title.localeCompare(b.title));
        console.log("a-z============> \n\n", sortedFinalResultDescending);
        setFinalResult(sortedFinalResultDescending);
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

  return (
    <div>
      <SearchResultCards props={finalResult} />
    </div>
  );
};

export default FusySearch;
