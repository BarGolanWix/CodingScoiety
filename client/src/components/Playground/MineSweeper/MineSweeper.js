import { useState, useEffect } from "react";
import { Card, Container } from "@mui/material";
import MineSweeperProvider from "../store/MineSweeperProvider";
import Board from "./Board";
import axios from "axios";

function MineSweeper({ userId }) {
  return (
    <MineSweeperProvider>
      <div className="mineSweeper">
        <article className="board">
          <Board dimensions={10} numOfMines={15} userId={userId} />
        </article>
      </div>
    </MineSweeperProvider>
  );
}

export default MineSweeper;
