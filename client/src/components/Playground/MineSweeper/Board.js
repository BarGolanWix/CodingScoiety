import React, { useState, useEffect } from "react";
import Row from "./Row";
import BoardHead from "./BoardHead";
import { useContext } from "react";
import MineSweeperContext from "../store/MineSweeperContext";

function Board({ dimensions, numOfMines, userName }) {
  const [boardMatrix, setBoardMatrix] = useState([]);
  const [numOfFlags, setNumOfFlags] = useState(numOfMines);
  const ctx = useContext(MineSweeperContext);

  useEffect(() => {
    const newBoard = createBoard(dimensions + 2, numOfMines);
    updateCountNeighbours(newBoard);
    setBoardMatrix(newBoard);
  }, []);

  const openCell = (cell) => {
    if (ctx.isGameOver === true) return;

    if (ctx.isWinner === true) return;

    if (cell.isOpen) return;

    if (cell.flag) return;

    if (!ctx.firstClick) {
      ctx.setFirstClick(true);
    }

    let newBoard = JSON.parse(JSON.stringify(boardMatrix));
    if (cell.isMine) {
      gameOver(newBoard);
      ctx.setIsGameOver(true);
    } else {
      revealNeighbours(newBoard, cell);
    }
    setBoardMatrix(newBoard);

    ctx.setIsWinner(checkWin(newBoard));
  };

  const flagCell = (cell) => {
    if (ctx.setIsGameOver === true) return;

    if (ctx.isGameOver === true) return;

    if (cell.isOpen) return;

    if (!ctx.firstClick) {
      ctx.setFirstClick(true);
    }

    const { row, column } = cell;
    let newBoard = JSON.parse(JSON.stringify(boardMatrix));
    newBoard[row][column].flag = !newBoard[row][column].flag;
    if (newBoard[row][column].flag) {
      setNumOfFlags((prevNum) => numOfFlags - 1);
    } else {
      setNumOfFlags((prevNum) => numOfFlags + 1);
    }
    setBoardMatrix(newBoard);

    ctx.setIsWinner(checkWin(newBoard));
  };

  return (
    <>
      <article className="boardHead">
        <BoardHead numOfFlags={numOfFlags} />
      </article>
      {boardMatrix.map((boardRow, index) => {
        if (index === boardRow.length - 1 || index === 0) return;
        return (
          <Row
            boardRow={boardRow}
            openCellFunc={openCell}
            flagCellFunc={flagCell}
            key={`boardRow-${index}`}
          />
        );
      })}
    </>
  );
}

export default Board;

const createAdjacencyList = (board, cell) => {
  const dimensions = board.length - 2;
  const { row, column } = cell;
  let list = [];

  if (
    row - 1 > 0 &&
    column - 1 > 0 &&
    row - 1 <= dimensions &&
    column - 1 <= dimensions
  ) {
    list.push(board[row - 1][column - 1]);
  }
  if (
    row - 1 > 0 &&
    column > 0 &&
    row - 1 <= dimensions &&
    column <= dimensions
  ) {
    list.push(board[row - 1][column]);
  }
  if (
    row - 1 > 0 &&
    column + 1 > 0 &&
    row - 1 <= dimensions &&
    column + 1 <= dimensions
  ) {
    list.push(board[row - 1][column + 1]);
  }
  if (
    row > 0 &&
    column - 1 > 0 &&
    row <= dimensions &&
    column - 1 <= dimensions
  ) {
    list.push(board[row][column - 1]);
  }
  // if (row > 0 && column > 0 && row <= dimensions && column <= dimensions) {
  //   list.push(board[row][column]);
  // }
  if (
    row > 0 &&
    column + 1 > 0 &&
    row <= dimensions &&
    column + 1 <= dimensions
  ) {
    list.push(board[row][column + 1]);
  }
  if (
    row + 1 > 0 &&
    column - 1 > 0 &&
    row + 1 <= dimensions &&
    column - 1 <= dimensions
  ) {
    list.push(board[row + 1][column - 1]);
  }
  if (
    row + 1 > 0 &&
    column > 0 &&
    row + 1 <= dimensions &&
    column <= dimensions
  ) {
    list.push(board[row + 1][column]);
  }
  if (
    row + 1 > 0 &&
    column + 1 > 0 &&
    row + 1 <= dimensions &&
    column + 1 <= dimensions
  ) {
    list.push(board[row + 1][column + 1]);
  }

  return list;
};

const createBoard = (dimensions, numOfMines) => {
  let newBoard = new Array(dimensions);

  for (let i = 0; i < newBoard.length; i++) {
    newBoard[i] = new Array(dimensions);

    for (let j = 0; j < newBoard.length; j++) {
      newBoard[i][j] = {
        row: i,
        column: j,
        isOpen: false,
        isMine: false,
        flag: false,
        mineNeighbours: 0,
      };
    }
  }
  spreadMines(newBoard, numOfMines);

  return newBoard;
};

const spreadMines = (board, numOfMines) => {
  const dimensions = board.length - 2;
  for (let i = 0; i < numOfMines; i++) {
    let row = 0;
    let col = 0;
    row = Math.floor(Math.random() * dimensions) + 1;
    col = Math.floor(Math.random() * dimensions) + 1;
    while (board[row][col].isMine == true) {
      row = Math.floor(Math.random() * dimensions) + 1;
      col = Math.floor(Math.random() * dimensions) + 1;
    }
    board[row][col].isMine = true;
  }
};

const updateCountNeighbours = (board) => {
  for (let i = 1; i < board.length - 1; i++) {
    for (let j = 1; j < board.length - 1; j++) {
      let count = 0;

      if (i - 1 >= 0 && j - 1 >= 0 && board[i - 1][j - 1].isMine == true) {
        count += 1;
      }
      if (i - 1 >= 0 && j >= 0 && board[i - 1][j].isMine == true) {
        count += 1;
      }
      if (i - 1 >= 0 && j + 1 >= 0 && board[i - 1][j + 1].isMine == true) {
        count += 1;
      }
      if (i >= 0 && j - 1 >= 0 && board[i][j - 1].isMine == true) {
        count += 1;
      }
      // if (i >= 0 && j >= 0 && board[i][j].isMine == true) {
      //   count += 1;
      // }
      if (i >= 0 && j + 1 >= 0 && board[i][j + 1].isMine == true) {
        count += 1;
      }
      if (i + 1 >= 0 && j - 1 >= 0 && board[i + 1][j - 1].isMine == true) {
        count += 1;
      }
      if (i + 1 >= 0 && j >= 0 && board[i + 1][j].isMine == true) {
        count += 1;
      }
      if (i + 1 >= 0 && j + 1 >= 0 && board[i + 1][j + 1].isMine == true) {
        count += 1;
      }

      board[i][j].mineNeighbours = count;
    }
  }
};

const revealNeighbours = (board, cell) => {
  const { row, column } = cell;
  board[row][column].isOpen = true;

  const neighbours = createAdjacencyList(board, cell);
  neighbours.forEach((neighbour) => {
    if (
      neighbour.mineNeighbours == 0 &&
      neighbour.isOpen == false &&
      neighbour.isMine == false &&
      neighbour.flag == false
    ) {
      revealNeighbours(board, neighbour);
    } else if (
      neighbour.mineNeighbours != 0 &&
      neighbour.isOpen == false &&
      neighbour.isMine == false &&
      neighbour.flag == false
    ) {
      neighbour.isOpen = true;
    }
  });
};

function gameOver(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j].isMine) {
        board[i][j].isOpen = true;
      }
    }
  }
}

function checkWin(board) {
  let winner = true;
  for (let i = 1; i < board.length - 1; i++) {
    for (let j = 1; j < board.length - 1; j++) {
      if (board[i][j].isOpen == false && board[i][j].flag == false) {
        winner = false;
      }
    }
  }
  return winner;
}
