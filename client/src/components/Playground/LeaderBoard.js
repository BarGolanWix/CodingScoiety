import React, { useState, useEffect, useContext } from "react";
import MineSweeperContext from "./store/MineSweeperContext";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const leaderboardData = [
  { rank: 1, name: "Player 1", score: 100, userId: "11" },
  { rank: 2, name: "Player 2", score: 95, userId: "12" },
];

const Leaderboard = ({ userId }) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const ctx = useContext(MineSweeperContext);

  useEffect(() => {
    ctx.getLeaderBoardData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollIndex(
        (prevIndex) => (prevIndex + 1) % ctx.leaderBoardData.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [ctx.leaderBoardData]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "#9c27b0" }}>Rank</TableCell>
            <TableCell sx={{ color: "#9c27b0" }}>Name</TableCell>
            <TableCell sx={{ color: "#9c27b0" }}>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ctx.leaderBoardData.map((row, index) => (
            <TableRow
              key={index}
              className={
                userId === row.userId ? "leaderboard-tableRow-currUser" : ""
              }
              style={{
                background: scrollIndex === index ? "#f0f0f0" : "transparent",
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.highScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Leaderboard;
