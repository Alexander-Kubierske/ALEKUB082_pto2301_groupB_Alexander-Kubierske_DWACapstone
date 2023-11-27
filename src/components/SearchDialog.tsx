import * as React from "react";
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
} from "@mui/material";

import {
  useSearchParamStore,
  ChipDataInterface,
} from "../store/searchParamStore";
import { genres } from "../services/podcastAPICalls";
import MenuIcon from "@mui/icons-material/Menu";

// <=========== CheckBox Func ===========>

const genreArray = (Object.entries(genres) as [string, string][]).map(
  ([genreId, genreName]) => ({
    genreId,
    genreName,
  })
);

interface OptionInterface {
  label: string;
  value: number;
}

const options: OptionInterface[] = [
  { label: "A-Z", value: 0 },
  { label: "Z-A", value: 1 },
  { label: "Date Newest", value: 2 },
  { label: "Date Oldest", value: 3 },
  ...genreArray.map(({ genreName }, index) => ({
    label: genreName,
    value: index + 4,
  })),
];

const CheckboxList = () => {
  const { checked, chipData, setChecked, setChipData } = useSearchParamStore();
  const [isAZChecked, setIsAZChecked] = React.useState(false);
  const [isZAChecked, setIsZAChecked] = React.useState(false);
  const [isNewestChecked, setIsNewestChecked] = React.useState(false);
  const [isOldestChecked, setIsOldestChecked] = React.useState(false);

  React.useEffect(() => {
    setIsAZChecked(checked.includes(0));
    setIsZAChecked(checked.includes(1));
    setIsNewestChecked(checked.includes(2));
    setIsOldestChecked(checked.includes(3));
  }, [checked]);

  const handleToggle = (value: number, options: OptionInterface[]) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      // if the item is not in the checked array we add it
      const newChip: ChipDataInterface = {
        key: value,
        label: `${options[value].label}`,
      };

      /**
       * Adds a new chip to the array of chips.
       *
       * @function
       * @param {ChipDataInterface[]} chipsToAdd - The existing array of chips to which the new chip will be added.
       * @param {ChipDataInterface} newChip - The new chip to be added to the array.
       * @returns {ChipDataInterface[]} The updated array of chips after adding the new chip.
       */
      const newChipArrayAdd = (
        chipData: ChipDataInterface[],
        newChip: ChipDataInterface
      ) => [...chipData, newChip];
      setChipData(newChipArrayAdd(chipData, newChip));
      newChecked.push(value);
    } else {
      // else it will be in the checked array so we delete it
      /**
       * Deletes a chip from the array of chips based on its key.
       *
       * @function
       * @param {ChipDataInterface[]} chipsToDelete - The existing array of chips from which the specified chip will be deleted.
       * @param {number} value - The key of the chip to be deleted.
       * @returns {ChipDataInterface[]} The updated array of chips after deleting the specified chip.
       */
      const newChipArrayDelete = (chipsToDelete: ChipDataInterface[]) =>
        chipsToDelete.filter((chip) => chip.key !== value);
      setChipData(newChipArrayDelete(chipData));
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setIsAZChecked(checked.includes(0));
    setIsZAChecked(checked.includes(1));
    setIsNewestChecked(checked.includes(3));
    setIsOldestChecked(checked.includes(4));
  };

  const shouldAZDisable = isZAChecked || isOldestChecked || isNewestChecked;
  const shouldZADisable = isAZChecked || isOldestChecked || isNewestChecked;
  const shouldNewDisable = isOldestChecked || isZAChecked || isAZChecked;
  const shouldOldDisable = isNewestChecked || isZAChecked || isAZChecked;

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {options.map(({ label, value }) => (
        <ListItem key={value}>
          <ListItemButton
            role={undefined}
            onClick={handleToggle(value, options)}
            dense
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  "aria-labelledby": `checkbox-list-label-${value}`,
                }}
                disabled={
                  (value === 0 && shouldAZDisable) ||
                  (value === 1 && shouldZADisable) ||
                  (value === 2 && shouldNewDisable) ||
                  (value === 3 && shouldOldDisable)
                }
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
        <MenuIcon sx={{ color: "black" }} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">{"Search Options"}</DialogTitle>
        <DialogContent>
          <div id="dialog-description">
            <CheckboxList />
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
