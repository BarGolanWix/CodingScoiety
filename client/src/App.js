import axios from "axios";
import "./App.css";
import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddNewPost from "./pages/AddNewPost";
import MyRecommendedPosts from "./pages/MyRecommendedPosts";
import Login from "./pages/Login";
import SearchFriends from "./pages/SearchFriends";
import CustomToolbar from "./components/CustomToolbar.js";

import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  ButtonGroup,
  Alert,
  Snackbar,
} from "@mui/material";

function App() {
  const baseURL = "http://localhost:3080";
  const popularityOptions = [1, 2, 4, 10, 20];

  const [userId, setUserId] = useState("");
  const [admitted, setAdmitted] = useState("");

  const [selectedPopularityQuery, setSelectedPopularityQuery] = useState("");
  const [selectedTagQuery, setSelectedTagQuery] = useState("");

  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [recommendedPosts, setRecommendedPosts] = useState([]);

  const [tags, setTags] = useState({});
  const [tagsList, setTagsList] = useState([]);
  const [selectedTagId, setSelectedTagId] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);

  const [alertMsg, setAlertMsg] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        handleAlert("", false, "");
      }, 1500);
    }
  }, [showAlert]);

  const handleAlert = (message, isShow, type) => {
    setAlertMsg(message);
    setShowAlert(isShow);
    setAlertType(type);
  };

  useEffect(() => {
    setAdmitted(localStorage.getItem("admitted"));
  }, []);

  ///////////////////////////////////// data req /////////////////////////////////////

  axios.defaults.withCredentials = true;

  ///////////////////////////////////// get req /////////////////////////////////////

  // sets a userId cookie
  const getUser = useCallback(() => {
    axios
      .get(`${baseURL}/user`)
      .then((response) => {
        setUserId(response.data.id);
      })
      .catch((error) => {
        handleAlert(error.message, true, "error");
      });
  }, []);

  const getPosts = useCallback(() => {
    axios
      .get(`${baseURL}/posts`)
      .then((response) => {
        setAllPosts([...response.data["Posts"]]);
        setFilteredPosts([...response.data["filteredPosts"]]);
      })
      .catch((error) => {
        handleAlert(error.message, true, "error");
      });
  }, []);

  const getTags = useCallback(() => {
    axios
      .get(`${baseURL}/tags`)
      .then((response) => {
        setTags({ ...response.data["Tags"] });
        const tagsList = [];
        for (const tagName in response.data["Tags"]) {
          tagsList.push(tagName);
        }
        setTagsList(tagsList);
      })
      .catch((error) => {
        handleAlert(error.message, true, "error");
      });
  }, []);

  useEffect(() => {
    getPosts();
    getTags();
    getUser();
  }, [getPosts, getTags, getUser]);

  const getFilteredPosts = (popularity, tag) => {
    const popUrl = popularity !== "" ? `popularity=${popularity}` : "";
    const tagUrl = tag !== "" ? `tag=${tag}` : "";

    axios
      .get(`${baseURL}/posts?${popUrl}&${tagUrl}`)
      .then((response) => {
        setFilteredPosts([...response.data["filteredPosts"]]);
      })
      .catch((error) => {
        handleAlert(error.message, true, "error");
      });
  };

  const getRecommendedPostsForMe = async () => {
    try {
      const response = await axios.get(`${baseURL}/posts/recommended`);
      console.log(...response.data["recommendedPosts"]);
      setRecommendedPosts([...response.data["recommendedPosts"]]);
    } catch (error) {
      console.log(error);
    }
  };

  ///////////////////// post req /////////////////////
  const addPost = (id, title, content, selectedTag) => {
    axios
      .post(
        `${baseURL}/posts`,
        {
          post: {
            id,
            title,
            content,
            selectedTag,
          },
        },
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        getPosts();
      });
  };

  const addNewTag = (tagName) => {
    axios
      .post(`${baseURL}/tags/tagName/${tagName}`)
      .then((response) => {
        setTags({ ...response.data["Tags"] });
        const tagsList = [];
        for (const tagName in response.data["Tags"]) {
          tagsList.push(tagName);
        }
        setTagsList(tagsList);
      })
      .catch((error) => {
        handleAlert(error.message, true, "error");
      });
  };

  ///////////////////////////////////// handle click events /////////////////////////////////////
  const handlePopularityClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopularityMenuClose = (selectedOption) => {
    setAnchorEl(null);
    filterPostsByPopularity(selectedOption);
  };

  const handleHomeClick = () => {
    setFilteredPosts(allPosts);
    setSelectedPopularityQuery("");
    setSelectedTagId("");
  };

  ///////////////////////////////////// filters /////////////////////////////////////
  const filterPostsByPopularity = (minLikeNum = 1) => {
    setSelectedPopularityQuery(`${minLikeNum}`);
    getFilteredPosts(minLikeNum, selectedTagQuery);
  };

  const filterPostsByTag = (tagName, tagId) => {
    setSelectedTagQuery(tagName);
    setSelectedTagId(tagId);
    getFilteredPosts(selectedPopularityQuery, tagName);
  };

  ///////////////////////////////////// render components /////////////////////////////////////

  return (
    <div className="App">
      <CustomToolbar
        admitted={admitted}
        handleHomeClick={handleHomeClick}
        handlePopularityClick={handlePopularityClick}
        popularityOptions={popularityOptions}
        anchorEl={anchorEl}
        handlePopularityMenuClose={handlePopularityMenuClose}
      />
      {showAlert && (
        <Snackbar>
          <Alert severity={alertType} data-testid="alert">
            {alertMsg}
          </Alert>
        </Snackbar>
      )}
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Login setAdmitted={setAdmitted} baseURL={baseURL} />}
          />
          <Route
            path="/my-recommended-posts"
            element={
              <MyRecommendedPosts
                Posts={recommendedPosts}
                Tags={tags}
                getRecommendedPostsForMe={getRecommendedPostsForMe}
                userId={userId}
                baseURL={baseURL}
              />
            }
          />
          <Route
            path="/add-new-post"
            element={<AddNewPost handleAddPost={addPost} tagsList={tagsList} />}
          />
          {admitted !== "unauthorized" && (
            <Route
              path="/home"
              element={
                <Home
                  Posts={filteredPosts}
                  Tags={tags}
                  tagsList={tagsList}
                  handleAddNewTag={addNewTag}
                  selectedTagId={selectedTagId}
                  selectedPopularityQuery={selectedPopularityQuery}
                  userId={userId}
                  baseURL={baseURL}
                  filterPostsByTag={filterPostsByTag}
                  admitted={admitted}
                />
              }
            />
          )}
          <Route
            path="/search-friends"
            element={<SearchFriends baseURL={baseURL} userId={userId} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
