import { List, Typography } from "@mui/material";
import FloatingMenu from "../components/UI/FloatingMenu";
import Playground from "../components/Playground/Playground";
import Post from "../components/Posts/Post";
import TagsCloud from "../components/Tags/TagsCloud";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function Home({
  Posts,
  Tags,
  tagsList,
  handleAddNewTag,
  selectedTagId,
  selectedPopularityQuery,
  userId,
  baseURL,
  filterPostsByTag,
  admitted,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState("");

  ///////////////////////////////////// handle query param /////////////////////////////////////

  searchParams.get("popularity");

  useEffect(() => {
    if (selectedPopularityQuery !== "") {
      setSearchParams({ popularity: `${selectedPopularityQuery}` });
    }
  }, [selectedPopularityQuery, setSearchParams]);

  ///////////////////////////////////// handle tag on post /////////////////////////////////////

  const handleAddTagClick = (event, selectedPostId) => {
    setAnchorEl(event.currentTarget);
    setSelectedPostId(selectedPostId);
  };

  const handleMenuClose = (selectedOption) => {
    setAnchorEl(null);
    selectedOption && addTagToPostTagsList(selectedOption);
  };

  const addTagToPostTagsList = (selectedOption) => {
    // Front
    const checkIfTagged = Tags[selectedOption].find(
      (postId) => postId === selectedPostId
    );
    if (checkIfTagged) return;
    Tags[selectedOption].push(selectedPostId);
    // Back
    updatePostTagListToServer(selectedOption);
  };

  const updatePostTagListToServer = async (selectedOption) => {
    const queryUrl = `option=${selectedOption}&postId=${selectedPostId}`;
    try {
      const response = await axios.post(`${baseURL}/posts/tags?${queryUrl}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  ///////////////////////////////////// handle filter tag /////////////////////////////////////

  const handleTagClick = (tagName, tagId) => {
    filterPostsByTag(tagName, tagId);
  };

  ///////////////////////////////////// handle delete post /////////////////////////////////////

  const handleDeletePostClick = async (postId) => {
    try {
      const response = await axios.put(
        `${baseURL}/deletePost`,
        {
          postId,
        },
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        }
      );
      const postToDelete = Posts.find((post) => postId === post.id);
      const index = Posts.indexOf(postToDelete);
      index !== -1 && Posts.splice(index, 1);
      index === -1 && console.log("postId not found");
      setSelectedPostId(-1);
    } catch (error) {
      console.log(error);
    }
  };

  ///////////////////////////////////// render components /////////////////////////////////////
  return (
    <div className="container">
      <List sx={{ width: "650px" }}>
        {Posts.length !== 0 &&
          Posts.map((post) => {
            return (
              <Post
                key={`home-${post.id}`}
                postId={post.id}
                postTitle={post.title}
                postContent={post.content}
                postWriter={post.writer}
                isAddTagBtn={true}
                isDeleteBtn={false}
                handleDeletePostClick={handleDeletePostClick}
                handleAddTagClick={handleAddTagClick}
                handleTagClick={handleTagClick}
                selectedTagId={selectedTagId}
                isTagDisabled={false}
                Tags={Tags}
                userId={userId}
                postLikes={post.likes}
                postDislikes={post.dislikes}
                baseURL={baseURL}
              />
            );
          })}
        {Posts.length === 0 && (
          <Typography variant="h5" component="div" data-testid="emptyPostList">
            No Posts Were Found
          </Typography>
        )}
      </List>
      {admitted.includes("admin") ? (
        <TagsCloud
          tagsList={tagsList}
          handleAddNewTag={handleAddNewTag}
          selectedTagId={selectedTagId}
          handleTagClick={handleTagClick}
        />
      ) : (
        <Playground userId={userId} baseURL={baseURL} />
      )}
      <FloatingMenu
        menuOptions={tagsList}
        anchorElement={anchorEl}
        handleMenuClose={handleMenuClose}
      />
    </div>
  );
}

export default Home;
