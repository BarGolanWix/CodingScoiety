import { List, Typography } from "@mui/material";
import { useEffect } from "react";
import Post from "../components/Post";

function MyRecommendedPosts({
  Posts,
  Tags,
  getRecommendedPostsForMe,
  userId,
  postLikes,
  postDislikes,
  baseURL,
}) {
  useEffect(() => {
    getRecommendedPostsForMe();
  }, []);

  return (
    <div className="container">
      <List sx={{ width: "650px" }}>
        {Posts.length !== 0 &&
          Posts.map((post) => {
            return (
              <Post
                key={`myRecommendedPosts-${post.id}`}
                postId={post.id}
                postTitle={post.title}
                postContent={post.content}
                postWriter={post.writer}
                isTagDisabled={true}
                isAddTagBtn={false}
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
    </div>
  );
}

export default MyRecommendedPosts;
