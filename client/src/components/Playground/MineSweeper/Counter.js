import React from "react";
import { Button } from "@mui/material";

function Counter({ numOfFlags }) {
  return <Button className="counter">{numOfFlags}</Button>;
}

export default Counter;
