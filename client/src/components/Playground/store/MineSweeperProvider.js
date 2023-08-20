import React, { useState, useEffect } from "react";
import MineSweeperContext from "./MineSweeperContext";
import axios from "axios";

function MineSweeperProvider(props) {
  const [userId, setUserId] = useState("");
  const [firstClick, setFirstClick] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timer, setTimer] = useState(1000);
  const [leaderBoardData, setLeaderBoardData] = useState([]);

  const baseURL = localStorage.getItem("baseURL");

  const getLeaderBoardData = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/mineSweeper/getLeaderBoardData`
      );
      const leaderBoardFromServer = response.data;
      setLeaderBoardData(leaderBoardFromServer);
    } catch (error) {
      console.log(error);
    }
  };

  const storeHighScore = async () => {
    try {
      const timerToSend = { score: timer };
      const response = await axios.put(
        `${baseURL}/mineSweeper/storeHighscore`,
        timerToSend
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (isWinner) {
    storeHighScore();
  }

  useEffect(() => {
    let timerId;
    if (firstClick) {
      timerId = setInterval(() => {
        setTimer((prevState) => prevState - 1);
      }, 1000);
      if (isGameOver || isWinner) {
        clearTimeout(timerId);
      }
      if (isWinner) {
        storeHighScore(timer, userId);
      }
    }
    return () => clearInterval(timerId);
  }, [timer, firstClick]);

  const state = {
    userId,
    setUserId,
    firstClick,
    setFirstClick,
    isWinner,
    setIsWinner,
    isGameOver,
    setIsGameOver,
    storeHighScore,
    timer,
    leaderBoardData,
    getLeaderBoardData,
  };

  return (
    <MineSweeperContext.Provider value={state}>
      {props.children}
    </MineSweeperContext.Provider>
  );
}

export default MineSweeperProvider;
