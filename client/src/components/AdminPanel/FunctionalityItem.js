import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

function FunctionalityItem({ id, text, checked, onChange }) {
  return (
    <FormControlLabel
      control={<Checkbox onChange={(event) => onChange(event, id)} />}
      label={text}
      checked={checked}
    />
  );
}

export default FunctionalityItem;
