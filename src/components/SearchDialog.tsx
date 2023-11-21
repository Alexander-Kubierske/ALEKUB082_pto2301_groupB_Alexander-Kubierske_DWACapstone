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
  DialogTitle,
  Button,
} from '@mui/material';

import { useSearchParamStore } from '../store/searchParamStore';
import { genres } from '../services/podcastAPICalls';
import MenuIcon from '@mui/icons-material/Menu';

// <=========== CheckBox Func ===========>
  
const CheckboxList = () => {
  const { checked, chipData, setChecked, setChipData } = useSearchParamStore();

console.log("chipdata in dialogue:", Array.isArray(chipData), chipData)// chiplog
  
  const handleToggle = (value: number) => () => { // need to pass this the options array specifically the label for each chip
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      console.log("chipdata currentIndex === -1", Array.isArray(chipData)) // chiplog
      const newChip = { key: value, label: `${value}` };
      const newChipArrayAdd = (chips) => (Array.isArray(chips) ? [...chips, newChip] : [newChip])
      setChipData(newChipArrayAdd(newChip));
      console.log("chipdata currentIndex === -1", Array.isArray(chipData), chipData) // chiplog
    } else {
      console.log("chipdata currentIndex === -1 (false)", Array.isArray(chipData)) // chiplog
      const newChipArrayDelete = (chips) => (Array.isArray(chips) ? chips.filter((chip) => chip.key !== value) : [])
      setChipData(newChipArrayDelete(chipData));
      newChecked.splice(currentIndex, 1);
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
          <div id="dialog-description">
            <CheckboxList/>
          </div>
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