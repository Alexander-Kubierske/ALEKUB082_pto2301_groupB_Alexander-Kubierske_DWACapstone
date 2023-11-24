import * as React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  useScrollTrigger,
  Slide,
  Button,
  styled,
  useTheme,
  Chip,
  Paper,
  TextField,
  Box,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import styledComponent from "styled-components";
import {
  useSearchParamStore,
  ChipDataInterface,
} from "../store/searchParamStore";
import { usePageStore } from "../store/1storeIndex";
import {
  SortingDialog,
  PodcastDialog,
  FusySearch,
} from "../components/1componentIndex";

// <=========== Navbar hide ===========>

interface Props {
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    target: undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

// <=========== Chip ===========>

interface ChipData {
  key: number;
  label: string;
}

const ListItemStyled = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

/**
 * Renders an array of chips based on the `chipData` state.
 *
 * @function
 * @name ChipsArray
 * @returns {React.ReactElement} The component rendering the array of chips.
 */
const ChipsArray = () => {
  const { checked, chipData, setChipData, setChecked } = useSearchParamStore();

  /**
   * Deletes a chip from the array.
   *
   * @function
   * @param {ChipDataInterface} chipToDelete - The chip to be deleted.
   * @returns {void}
   */
  const handleDelete = (chipToDelete: ChipData) => () => {
    const updatedChipData = chipData.filter(
      (chip) => chip.key !== chipToDelete.key
    );
    setChipData(updatedChipData);

    /**
     * Removes a specific chip key from the array of checked items.
     *
     * @function
     * @param {number[]} prevChecked - The previous array of checked items.
     * @param {number} chipKeyToRemove - The key of the chip to be removed from the checked items.
     * @returns {number[]} The updated array of checked items after removing the specified chip key.
     */
    const chipRemoval = (prevChecked: number[]) =>
      prevChecked.filter((value) => value !== chipToDelete.key);
    setChecked(chipRemoval(checked));
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {chipData.map((data) => (
        <ListItemStyled key={data.key}>
          <Chip label={data.label} onDelete={handleDelete(data)} />
        </ListItemStyled>
      ))}
    </Paper>
  );
};

// <=========== NavBar content ===========>

const SearchNavBarStyled = styledComponent.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`;
const SearchNavBar = () => {
  const theme = useTheme();
  const { setActivePage } = usePageStore();
  const { chipData, setChipData } = useSearchParamStore();

  const handleExitClick = () => {
    setActivePage("home");
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const inputValue = formData.get("Search") as string;

    if (inputValue) {
      const newChipLabel = inputValue.trim();
      const newChip = { key: chipData.length + 1, label: newChipLabel };
      const newChipArrayAdd = (
        chipData: ChipDataInterface[],
        newChip: ChipDataInterface
      ) => [...chipData, newChip];
      setChipData(newChipArrayAdd(chipData, newChip));
      event.currentTarget.reset();
    }
  };

  return (
    <SearchNavBarStyled>
      <Button onClick={handleExitClick}>
        <CloseIcon sx={{ color: "black" }} />
      </Button>

      <Box
        sx={{
          padding: "0.5vh",
          marginLeft: "auto",
          width: 500,
          maxWidth: "60vw",
          flex: 1,
          [theme.breakpoints.up("sm")]: {
            // tablets and up
            maxWidth: "500px",
          },

          [theme.breakpoints.down("sm")]: {
            // mobile
            maxWidth: "200px",
          },
        }}
        className="search--page--container"
      >
        <form onSubmit={handleSearchSubmit}>
          <TextField fullWidth label="Search" id="Search" name="Search" />
        </form>
      </Box>

      <SortingDialog />
    </SearchNavBarStyled>
  );
};

// <=========== SearchPage Func ===========>

const SearchPage = () => {
  return (
    <React.Fragment>
      <CssBaseline />

      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <SearchNavBar />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />

      <ChipsArray />

      <FusySearch />
      <PodcastDialog />
    </React.Fragment>
  );
};

export default SearchPage;
