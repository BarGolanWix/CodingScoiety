import React, { useContext } from "react";
import { Button } from "@mui/material";
import MineSweeperContext from "../store/MineSweeperContext";

function ResetButton() {
  const ctx = useContext(MineSweeperContext);

  const resetClickHandler = () => {
    ctx.setFirstClick(false);
    window.location.reload(false);
  };

  return (
    <Button variant="contained" className="reset" onClick={resetClickHandler}>
      Reset
    </Button>
  );
}

export default ResetButton;
