import React from "react";

const MineSweeperContext = React.createContext({
  userId: null,
  setUserId: null,
  firstClick: false,
  setFirstClick: null,
  isWinner: false,
  setIsWinner: null,
  isGameOver: false,
  setIsGameOver: null,
  storeHighScore: null,
  timer: null,
  leaderBoardData: null,
  getLeaderBoardData: null,
});

export default MineSweeperContext;
