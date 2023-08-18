import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { useContext } from "react";
import MineSweeperContext from "../store/MineSweeperContext";

function Timer() {
  const ctx = useContext(MineSweeperContext);

  return <Button className="timer">{ctx.timer}</Button>;
}

export default Timer;
