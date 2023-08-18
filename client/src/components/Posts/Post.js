import {
  ListItem,
  ListItemButton,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import AddTagButton from "../Tags/AddTagButton";

import Tag from "../Tags/Tag";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteButton from "./DeleteButton";

function Post({
  postId,
  postTitle,
  postContent,
  isAddTagBtn,
  handleAddTagClick,
  handleTagClick,
  selectedTagId,
  isTagDisabled,
  Tags,
  userId,
  postLikes,
  postDislikes,
  baseURL,
  postWriter,
  isDeleteBtn,
  handleDeletePostClick,
}) {
  const getTagsByPostId = (postID) => {
    const tagsArr = [];
    for (const tagName in Tags) {
      if (Tags[tagName].includes(postID)) {
        tagsArr.push(tagName);
      }
    }
    return tagsArr;
  };

  const tagsNameArr = getTagsByPostId(postId);
  const isTag = tagsNameArr.length > 0 ? true : false;
  const [didUserLikePost, setDidUserLikePost] = useState(false);
  const [didUserDislikePost, setDidUserDislikePost] = useState(false);
  const [readMore, setReadMore] = useState(false);
  // const userId = localStorage.getItem("userId");

  useEffect(() => {
    setDidUserLikePost(
      postLikes === undefined
        ? false
        : postLikes.includes(userId)
        ? true
        : false
    );
    setDidUserDislikePost(
      postDislikes === undefined
        ? false
        : postDislikes.includes(userId)
        ? true
        : false
    );
  });

  if (postWriter[0] === userId) {
    isAddTagBtn = true;
    isDeleteBtn = true;
  } else {
    isAddTagBtn = false;
  }

  const handleDislikeClick = () => {
    if (didUserDislikePost) {
      const index = postDislikes.indexOf(userId);
      index !== -1 && postDislikes.splice(index, 1);
      setDidUserDislikePost(false);
      sendLikesDislikesToServer();
      return;
    }

    postDislikes.push(userId);
    setDidUserDislikePost(true);

    if (didUserLikePost) {
      const findUser = postLikes.indexOf((user) => user === userId);
      postLikes.splice(findUser, 1);
      setDidUserLikePost(false);
    }
    sendLikesDislikesToServer();
  };

  const handleLikeClick = () => {
    if (didUserLikePost) {
      const index = postLikes.indexOf(userId);
      index !== -1 && postLikes.splice(index, 1);
      setDidUserLikePost(false);
      sendLikesDislikesToServer();
      return;
    }

    postLikes.push(userId);
    setDidUserLikePost(true);

    if (didUserDislikePost) {
      const findUser = postDislikes.indexOf(userId);
      postDislikes.splice(findUser, 1);
      setDidUserDislikePost(false);
    }
    sendLikesDislikesToServer();
  };

  const sendLikesDislikesToServer = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/posts/likesDislikes`,
        {
          postId: postId,
          postLikes: postLikes,
          postDislikes: postDislikes,
          didUserLikePost: didUserLikePost,
          didUserDislikePost: didUserDislikePost,
        },
        { headers: { "content-type": "application/x-www-form-urlencoded" } }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleReadMore = () => {
    setReadMore((prev) => !prev);
  };

  return (
    <ListItem
      alignItems="flex-start"
      key={`post-${postId}`}
      className="post"
      data-testid={`post-${postId}`}
      sx={{ marginTop: "5%" }}
    >
      <Card className="post">
        {isDeleteBtn && (
          <DeleteButton
            handleDeletePostClick={handleDeletePostClick}
            postId={postId}
          />
        )}
        <ListItemButton disableGutters>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold" }}
              color="primary"
              gutterBottom
              data-testid={`postTitle-${postWriter}`}
            >
              {postWriter[1]}
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold" }}
              color="secondary"
              gutterBottom
              data-testid={`postTitle-${postId}`}
            >
              {postTitle}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              data-testid={`postContent-${postId}`}
            >
              {readMore ? postContent : postContent.substring(0, 200)}
            </Typography>
          </CardContent>
        </ListItemButton>
        <CardActions>
          {isAddTagBtn && (
            <AddTagButton
              dataTestId={`postAddTagBtn-${postId}`}
              onClick={(e) => handleAddTagClick(e, postId)}
            />
          )}
          {isTag &&
            tagsNameArr.map((tagName, index) => (
              <Tag
                key={`post-${index}-${tagName}`}
                tagName={tagName}
                postId={postId}
                handleOnClick={handleTagClick}
                selectedTagId={selectedTagId}
                isDisabled={isTagDisabled}
              />
            ))}
          <IconButton
            aria-label="readMore"
            size="small"
            data-testid={`postContent-readMoreButton`}
            onClick={() => handleReadMore()}
          >
            <AutoStoriesIcon sx={{ color: "#a8a8a8" }} />
          </IconButton>
          <IconButton
            aria-label="dislike"
            size="small"
            data-testid={`postDislikeBtn-${postId}`}
            onClick={handleDislikeClick}
          >
            {didUserDislikePost ? (
              <ThumbDownAltIcon
                color="error"
                data-testid={`fullDislikeIcon-${postId}`}
              />
            ) : (
              <ThumbDownOffAltIcon
                color="error"
                data-testid={`hollowDislikeIcon-${postId}`}
              />
            )}
          </IconButton>
          <Typography
            variant="string"
            data-testid={`postDislikeNum-${postId}`}
            color="red"
          >
            {postDislikes !== undefined ? postDislikes.length : 0}
          </Typography>
          <IconButton
            aria-label="like"
            size="small"
            data-testid={`postLikeBtn-${postId}`}
            onClick={handleLikeClick}
          >
            {didUserLikePost ? (
              <ThumbUpAltIcon
                color="success"
                data-testid={`fullLikeIcon-${postId}`}
              />
            ) : (
              <ThumbUpOffAltIcon
                color="success"
                data-testid={`hollowLikeIcon-${postId}`}
              />
            )}
          </IconButton>
          <Typography
            variant="string"
            data-testid={`postLikeNum-${postId}`}
            color="green"
          >
            {postLikes !== undefined ? postLikes.length : 0}
          </Typography>
        </CardActions>
      </Card>
    </ListItem>
  );
}

export default Post;
