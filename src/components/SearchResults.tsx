import * as React from "react";
import Fuse from "fuse.js";
import {
  usePodcastPreviewStore,
  useSearchParamStore,
  ChipDataInterface,
} from "../store/1storeIndex";
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
    // <=========== Extract labels ===========>

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

    // <=========== filter labels ===========>
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

    // <=========== Search by Title ===========>
    const searchQueryTitle = {
      title: extractedTitle.join(" "),
    };

    const fuseTitle = new Fuse<Podcast>(data, searchOptions);
    const titleResults = fuseTitle.search(searchQueryTitle);

    // <=========== search by Genre ===========>
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

  // <=========== Sort Data  Alphabetically ===========>

  React.useEffect(() => {
    const labelsToCheck = ["A-Z", "Z-A", "Date Newest", "Date Oldest"];
    const isAZLabelPresent = chipData.some((chip) => chip.label === "A-Z");
    const isZALabelPresent = chipData.some((chip) => chip.label === "Z-A");
    const isDateNewestLabelPresent = chipData.some(
      (chip) => chip.label === "Date Newest"
    );
    const isDateOldLabelPresent = chipData.some(
      (chip) => chip.label === "Date Oldest"
    );
    let sortedResults = finalResult.slice();

    if (
      labelsToCheck.some((label) =>
        chipData.some((chip) => chip.label === label)
      )
    ) {
      if (isZALabelPresent) {
        const sortedFinalResultAscending = finalResult
          .slice()
          .sort((a, b) => b.title.localeCompare(a.title));
        setFinalResult(sortedFinalResultAscending);
      } else if (isAZLabelPresent) {
        const sortedFinalResultDescending = finalResult
          .slice()
          .sort((a, b) => a.title.localeCompare(b.title));
        setFinalResult(sortedFinalResultDescending);
      } else if (isDateNewestLabelPresent) {
        const sortedNewResults = sortedResults.sort((a, b) => {
          const dateA = new Date(a.updated).getTime();
          const dateB = new Date(b.updated).getTime();
          return dateB - dateA;
        });
        setFinalResult(sortedNewResults);
      } else if (isDateOldLabelPresent) {
        const sortedOldResults = sortedResults.sort((a, b) => {
          const dateA = new Date(a.updated).getTime();
          const dateB = new Date(b.updated).getTime();
          return dateA - dateB;
        });
        setFinalResult(sortedOldResults);
      }
    }
  }, [chipData]);
  // <=========== Output ===========>
  return (
    <div>
      <SearchResultCards props={finalResult} />
    </div>
  );
};

export default FusySearch;
