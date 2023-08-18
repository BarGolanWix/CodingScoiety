import React from "react";

import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  ButtonGroup,
} from "@mui/material";

import FloatingMenu from "./FloatingMenu";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RecommendIcon from "@mui/icons-material/Recommend";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

function CustomToolbar({
  admitted,
  handleHomeClick,
  handlePopularityClick,
  popularityOptions,
  anchorEl,
  handlePopularityMenuClose,
  baseURL,
}) {
  const handleSignOutClick = async () => {
    try {
      const response = await axios.put(`${baseURL}/logout`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar>
        {admitted ? (
          <ButtonGroup variant="text" aria-label="text button group">
            <Button
              onClick={handleHomeClick}
              href="/home"
              size="large"
              sx={{ letterSpacing: 1 }}
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
            <Button
              href="/add-new-post"
              size="large"
              sx={{ letterSpacing: 1 }}
              startIcon={<AddCircleIcon />}
              data-testid="addNewPostBtn"
            >
              Add a New Post
            </Button>
            <Button
              href="/my-recommended-posts"
              size="large"
              sx={{ letterSpacing: 1 }}
              startIcon={<RecommendIcon />}
              data-testid="myRecommendedPostsBtn"
            >
              Explore more posts
            </Button>
            <Button
              href="/search-friends"
              size="large"
              sx={{ letterSpacing: 1 }}
              startIcon={<SearchIcon />}
              data-testid="mySearchFriendsBtn"
            >
              Search Friends
            </Button>
          </ButtonGroup>
        ) : (
          ""
        )}
        <Typography
          variant="h5"
          letterSpacing={1}
          component="div"
          sx={{ fontFamily: "monospace", flexGrow: 1 }}
        >
          Coding Society
        </Typography>
        <Button
          className={
            !window.location.href.startsWith("http://localhost:3000/home")
              ? "visibilityHidden"
              : ""
          }
          size="large"
          sx={{ letterSpacing: 1 }}
          startIcon={<FilterAltIcon />}
          onClick={(e) => handlePopularityClick(e)}
          data-testid="popularityBtn"
        >
          Filter by Popularity
        </Button>
        <Button
          className={
            window.location.href !== "http://localhost:3000/" &&
            window.location.href !== "http://localhost:3000/signUp"
              ? ""
              : "visibilityHidden"
          }
          size="large"
          color="inherit"
          sx={{
            letterSpacing: 1,
          }}
          href="/"
          onClick={handleSignOutClick}
          data-testid="signOutBtn"
        >
          Sign Out
        </Button>
        <FloatingMenu
          menuOptions={popularityOptions}
          anchorElement={anchorEl}
          handleMenuClose={handlePopularityMenuClose}
        />
      </Toolbar>
    </AppBar>
  );
}

export default CustomToolbar;
