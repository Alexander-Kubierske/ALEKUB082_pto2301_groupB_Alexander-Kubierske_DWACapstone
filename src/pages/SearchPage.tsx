import * as React from 'react';
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
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import styledComponent from 'styled-components';
import { useSearchParamStore } from '../store/searchParamStore';
import SortingDialog from '../components/SearchDialog';

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
};

// <=========== NavBar content ===========>

const SearchNavBarStyled = styledComponent.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`
const SearchNavBar = () => {
  const theme = useTheme();

  return (
      <SearchNavBarStyled>
        <Button>
          <CloseIcon sx={{ color: 'black' }}/>
        </Button>

        <Box
          sx={{
            padding: '0.5vh',
            marginLeft: 'auto',
            width: 500,
            maxWidth: '60vw',
            flex: 1,
            [theme.breakpoints.up('sm')]: {
              // tablets and up
              maxWidth: '500px',
            },
  
            [theme.breakpoints.down('sm')]: {
              // mobile
              maxWidth: '200px',
            },
          }}
          className="search--page--container"
        >
          <TextField fullWidth label="Search" id="Search" />
        </Box>

        <SortingDialog/>
      </SearchNavBarStyled>
    );
};

// <=========== Chip ===========>

interface ChipData {
  key: number;
  label: string;
}

const ListItemStyled = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ChipsArray = () => {
  const { chipData, setChipData, setChecked } = useSearchParamStore();

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData(chips => chips.filter((chip) => chip.key !== chipToDelete.key));
    setChecked(prevChecked => prevChecked.filter((value) => value !== chipToDelete.key));
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
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
  )
};

// <=========== SearchPage Func ===========>

const SearchPage =() => {

  return (
    <React.Fragment>
      <CssBaseline />

      <HideOnScroll >
        <AppBar>
          <Toolbar>
            <SearchNavBar/>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />

      <ChipsArray />

        {/** results */}

    </React.Fragment>
  );
};

export default SearchPage