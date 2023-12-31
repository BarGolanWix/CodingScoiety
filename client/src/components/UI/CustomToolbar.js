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
import { useContext } from "react";
import axios from "axios";
import AdminContext from "../AdminPanel/store/AdminContext";
import SessionContext from "../../session-store/SessionContext";

const generateTitle = () => {
  if (
    window.location.href === `${window.location.origin}/my-recommended-posts`
  ) {
    return "Recommended For You";
  } else if (
    window.location.href === `${window.location.origin}/search-friends`
  ) {
    return "Search Friends";
  } else if (
    window.location.href === `${window.location.origin}/add-new-post`
  ) {
    return "Add A New Post";
  } else {
    return "Coding Society";
  }
};

function CustomToolbar({
  admitted,
  handleHomeClick,
  handlePopularityClick,
  popularityOptions,
  anchorEl,
  handlePopularityMenuClose,
  baseURL,
}) {
  const ctx = useContext(AdminContext);
  const sessionCtx = useContext(SessionContext);
  const isSessionValid = sessionCtx.isSessionValid();
  console.log(isSessionValid);

  const handleSignOutClick = async () => {
    try {
      const response = await axios.put(`${baseURL}/logout`);
      localStorage.setItem("accessTokenExpiration", new Date());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar position="sticky" color="inherit">
      <Toolbar>
        {isSessionValid ? (
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
              value="addNewPostBtn"
              disabled={ctx.functionalities.addNewPost.checked}
            >
              Add a New Post
            </Button>
            <Button
              href="/my-recommended-posts"
              size="large"
              sx={{ letterSpacing: 1 }}
              startIcon={<RecommendIcon />}
              data-testid="myRecommendedPostsBtn"
              value="myRecommendedPostsBtn"
              disabled={ctx.functionalities.exploreMorePosts.checked}
            >
              Explore more posts
            </Button>
            <Button
              href="/search-friends"
              size="large"
              sx={{ letterSpacing: 1 }}
              startIcon={<SearchIcon />}
              data-testid="mySearchFriendsBtn"
              value="mySearchFriendsBtn"
              disabled={ctx.functionalities.searchFriends.checked}
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
          {generateTitle()}
        </Typography>
        <Button
          className={
            !window.location.href.startsWith(`${window.location.origin}/home`)
              ? "visibilityHidden"
              : ""
          }
          size="large"
          sx={{ letterSpacing: 1 }}
          startIcon={<FilterAltIcon />}
          onClick={(e) => handlePopularityClick(e)}
          data-testid="popularityBtn"
          value="popularityBtn"
          disabled={ctx.functionalities.popularityFilter.checked}
        >
          Filter by Popularity
        </Button>
        {isSessionValid && (
          <Button
            className={
              window.location.href !== `${window.location.origin}/` &&
              window.location.href !== `${window.location.origin}/signUp`
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
        )}
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
