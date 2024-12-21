import React, { useState } from "react";
import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy"; // Ensure you have MUI Joy installed
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ClickAwayListener } from "@mui/material";

function FilterDropdown({ handleOnFilterChange, filterList }) {
  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Filter");

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = ({ itemName }) => {
    handleOnFilterChange({ filter: itemName });
    setSelectedFilter(itemName);
    setOpen(false);
  };

  const handleClickAway = () => {
    if (open) setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <Dropdown open={open} onOpenChange={setOpen} onClose={handleClose}>
          <MenuButton
            sx={{ "--Button-radius": "1.5rem" }}
            variant="outlined"
            endDecorator={<KeyboardArrowDownIcon />}
            onClick={handleToggle}
          >
            {selectedFilter}
          </MenuButton>
          <Menu
            variant="outlined"
            placement="bottom-start"
            disablePortal
            onClose={handleClose}
            size="sm"
            sx={{
              "--ListItemDecorator-size": "24px",
              "--ListItem-minHeight": "40px",
              "--ListDivider-gap": "4px",
              minWidth: 200,
            }}
          >
            {filterList.map((item) => (
              <MenuItem
                key={item.id}
                onClick={() => handleSelect({ itemName: item.name })}
              >
                {item.name}
              </MenuItem>
            ))}
          </Menu>
        </Dropdown>
      </div>
    </ClickAwayListener>
  );
}

export default FilterDropdown;
