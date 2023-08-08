import { List, Typography } from "@mui/material";
import FloatingMenu from "../components/FloatingMenu";
import Post from "../components/Post";
import TagsCloud from "../components/TagsCloud";
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
    addTagToPostTagsList(selectedOption);
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
                isAddTagBtn={true}
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
      <TagsCloud
        tagsList={tagsList}
        handleAddNewTag={handleAddNewTag}
        selectedTagId={selectedTagId}
        handleTagClick={handleTagClick}
      />
      <FloatingMenu
        menuOptions={tagsList}
        anchorElement={anchorEl}
        handleMenuClose={handleMenuClose}
      />
    </div>
  );
}

export default Home;
