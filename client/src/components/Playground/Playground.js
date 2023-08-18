import React from "react";
import {
  Container,
  Typography,
  Divider,
  Box,
  CardContent,
  Button,
} from "@mui/material";
import Leaderboard from "./LeaderBoard";
import { useNavigate } from "react-router-dom";
import MineSweeperProvider from "./store/MineSweeperProvider";

function Playground({ userId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/minesweeper");
  };

  return (
    <MineSweeperProvider>
      <Container
        maxWidth="xs"
        className="tagsListContainer"
        data-testid="tagList"
      >
        <Button
          variant="text"
          sx={{ fontWeight: "bold", fontSize: "18px" }}
          size="large"
          onClick={handleClick}
        >
          Playground
        </Button>
        <Divider />
        <Leaderboard userId={userId} />
      </Container>
    </MineSweeperProvider>
  );
}

export default Playground;
