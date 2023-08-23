import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SessionContext from "../../../session-store/SessionContext";
import { Card, Container } from "@mui/material";
import MineSweeperProvider from "../store/MineSweeperProvider";
import Board from "./Board";
import axios from "axios";

function MineSweeper({ userId }) {
  const navigate = useNavigate();
  const sessionCtx = useContext(SessionContext);

  useEffect(() => {
    if (!sessionCtx.isSessionValid()) {
      navigate("/sessionExpired");
    }
  });

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
