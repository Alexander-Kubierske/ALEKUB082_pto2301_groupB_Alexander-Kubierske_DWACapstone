import * as React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

import { useSearchParamStore } from '../store/searchParamStore';
import { genres } from '../services/podcastAPICalls';
import MenuIcon from '@mui/icons-material/Menu';

// <=========== CheckBox Func ===========>
  
const CheckboxList = () => {
  const { checked, setChecked, setChipData } = useSearchParamStore();

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      setChipData((chips) => [...chips, { key: value, label: `Option ${value}` }]);
    } else {
      newChecked.splice(currentIndex, 1);
      setChipData((chips) => chips.filter((chip) => chip.key !== value));
    }

    setChecked(newChecked);
  };

  const genreArray = (Object.entries(genres) as [string, string][]).map(([genreId, genreName]) => ({
      genreId,
      genreName,
  }));

  const options = [
      { label: 'A-Z', value: 0 },
      { label: 'Z-A', value: 1 },
      { label: 'Date Newest', value: 2 },
      { label: 'Date Oldest', value: 3 },
      ...genreArray.map(({ genreName }, index) => ({ label: genreName, value: index + 4 })),
  ];

  return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {options.map(({ label, value }) => (
          <ListItem key={value}>
          <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
              <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': `checkbox-list-label-${value}` }}
              />
              </ListItemIcon>
              <ListItemText primary={label} />
          </ListItemButton>
          </ListItem>
      ))}
      </List>
  );
};

// <=========== SortingDialogue Func ===========>

const SortingDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
        <Button onClick={handleClickOpen}>
          <MenuIcon sx={{ color: 'black' }}/>
        </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">
          {"Search Options"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            <CheckboxList/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default SortingDialog;