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

function CustomToolbar({
  admitted,
  handleHomeClick,
  handlePopularityClick,
  popularityOptions,
  anchorEl,
  handlePopularityMenuClose,
}) {
  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar>
        {admitted ? (
          <ButtonGroup variant="text" aria-label="text button group">
            <Button
              onClick={handleHomeClick}
              href="/home"
              size="large"
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
            <Button
              href="/add-new-post"
              size="large"
              startIcon={<AddCircleIcon />}
              data-testid="addNewPostBtn"
            >
              Add a New Post
            </Button>
            <Button
              href="/my-recommended-posts"
              size="large"
              startIcon={<RecommendIcon />}
              data-testid="myRecommendedPostsBtn"
            >
              Explore more posts
            </Button>
            <Button
              href="/search-friends"
              size="large"
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
          letterSpacing={1.5}
          component="div"
          sx={{ fontFamily: "monospace", flexGrow: 1 }}
        >
          Coding Society
        </Typography>
        <Button
          className={
            window.location.href !==
              "http://localhost:3000/my-recommended-posts" &&
            window.location.href !== "http://localhost:3000/add-new-post" &&
            window.location.href !== "http://localhost:3000/search-friends" &&
            window.location.href !== "http://localhost:3000/"
              ? ""
              : "visibilityHidden"
          }
          size="large"
          startIcon={<FilterAltIcon />}
          onClick={(e) => handlePopularityClick(e)}
          data-testid="popularityBtn"
        >
          Filter by Popularity
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
