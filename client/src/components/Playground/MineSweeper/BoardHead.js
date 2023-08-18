import React from "react";
import Counter from "./Counter";
import ResetButton from "./ResetButton";
import { Card, Container } from "@mui/material";
import { ButtonGroup } from "@mui/material";

import Timer from "./Timer";

function BoardHead({ numOfFlags }) {
  return (
    <ButtonGroup className="minsweeper-header">
      <Counter numOfFlags={numOfFlags} />
      <ResetButton />
      <Timer />
    </ButtonGroup>
  );
}

export default BoardHead;
