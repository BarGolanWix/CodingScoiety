import React from "react";
import {
  Container,
  Typography,
  Divider,
  Box,
  CardContent,
  Button,
  ButtonGroup,
} from "@mui/material";
import Leaderboard from "./LeaderBoard";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import MineSweeperProvider from "./store/MineSweeperProvider";
import AdminContext from "../AdminPanel/store/AdminContext";
function Playground({ userId }) {
  const navigate = useNavigate();
  const ctx = useContext(AdminContext);

  const handleClick = () => {
    if (!ctx.isPlaygroundDis) {
      navigate("/minesweeper");
    }
  };

  return (
    <MineSweeperProvider>
      <Container
        maxWidth="xs"
        className="tagsListContainer"
        data-testid="tagList"
      >
        <div className="leaderboard-buttons">
          <Button variant="text" sx={{ fontWeight: "bold" }} size="large">
            Leader Board
          </Button>
          <Button
            sx={{ fontWeight: "bold" }}
            size="large"
            onClick={handleClick}
            disabled={ctx.functionalities.playground.checked}
            value="goPlayBtn"
          >
            Go Play !
          </Button>
        </div>
        <Divider />
        <Leaderboard userId={userId} />
      </Container>
    </MineSweeperProvider>
  );
}

export default Playground;
