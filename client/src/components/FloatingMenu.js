import { MenuItem, Menu } from "@mui/material";
import { useState } from "react";

function FloatingMenu({ menuOptions, anchorElement, handleMenuClose }) {
  const open = Boolean(anchorElement);
  const [selectedOption, setSelectedOption] = useState(false);

  const handleClose = (selectedOption) => {
    const option = menuOptions.includes(selectedOption) ? selectedOption : "";
    setSelectedOption(option);
    handleMenuClose(option);
  };

  return (
    <Menu
      id="positioned-menu"
      data-testid="positioned-menu"
      aria-labelledby="positioned-button"
      anchorEl={anchorElement}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {menuOptions.map((option) => {
        const optionId = `positioned-menu-${option}`;
        return (
          <MenuItem
            selected={`positioned-menu-${selectedOption}` === optionId}
            key={option}
            value={option}
            onClick={() => handleClose(option)}
            data-testid={optionId}
          >
            {option}
          </MenuItem>
        );
      })}
    </Menu>
  );
}

export default FloatingMenu;
