const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const cors = require("cors");

const { baseUrl } = require("../constants");
const { Posts } = require("./model/Posts");
const { Tags } = require("./model/Tags");
const { Users } = require("./model/Users");

const app = express();
const port = 3080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: `${baseUrl.client}`,
  credentials: true,
};

app.use(cors(corsOptions));

///////////////////////////////////// user /////////////////////////////////////

app.get("/", cors(corsOptions), (req, res) => {
  res.send("Welcome to your Wix Enter exam!");
});

app.get("/user", cors(corsOptions), (req, res) => {
  const userId = req.cookies?.userId || uuidv4();
  res.cookie("userId", userId).send({ id: userId });
});

app.post("/credentialsCheck", cors(corsOptions), (req, res) => {
  const { userName, password } = req.body.account;
  res.status(200).send({ success: true });
});

///////////////////////////////////// posts /////////////////////////////////////
app.get("/posts", cors(corsOptions), (req, res) => {
  let { popularity, tag } = req.query;
  let filteredPosts = JSON.parse(JSON.stringify(Posts));
  if (popularity) {
    popularity = Number(popularity);
    filteredPosts = filteredPosts.filter(
      (post) => post.likes.length >= popularity
    );
  }
  if (tag) {
    filteredPosts = filteredPosts.filter((post) => Tags[tag].includes(post.id));
  }
  res.status(200).send({ filteredPosts, Posts });
});

app.post("/posts", cors(corsOptions), (req, res) => {
  const { id, title, content, selectedTag } = req.body.post;
  userId = req.cookies?.userId;
  const newPost = {
    id: id,
    title: title,
    content: content,
    userId: userId,
    likes: [],
    dislikes: [],
  };
  Posts.push(newPost);

  if (selectedTag) {
    Tags[selectedTag].push(id);
  }

  res.status(200).send({ success: true });
});

app.post("/posts/tags", cors(corsOptions), (req, res) => {
  const { option, postId } = req.query;
  Tags[option].push(postId);
  res
    .status(200)
    .send({ success: true, message: `added ${option} tag to post ${postId}` });
});

app.post("/posts/likesDislikes", cors(corsOptions), (req, res) => {
  let { postId, postLikes, postDislikes, didUserLikePost } = req.body;
  postLikes = !postLikes ? [] : postLikes;
  postDislikes = !postDislikes ? [] : postDislikes;

  const postToUpdate = Posts.find((post) => post.id === postId);
  let newLike = findMissmatch(postToUpdate.likes, postLikes);
  let newDislike = findMissmatch(postToUpdate.dislikes, postDislikes);

  if (newLike !== -1 && newDislike !== -1) {
    console.log("both missmatch");
  } else {
    if (newLike !== -1) {
      postToUpdate.likes.push(newLike);
      const index = postToUpdate.dislikes.indexOf(newLike);
      if (index !== -1) {
        postToUpdate.dislikes.splice(index, 1);
      }
    }
    if (newDislike !== -1) {
      postToUpdate.dislikes.push(newDislike);
      const index = postToUpdate.likes.indexOf(newDislike);
      if (index !== -1) {
        postToUpdate.likes.splice(index, 1);
      }
    }
  }

  res.status(200).send({ success: true, newPost: postToUpdate });
});

const findMissmatch = (originalList, newList) => {
  newItem = -1;
  newList.forEach((value) => {
    if (!originalList.includes(value)) {
      newItem = value;
    }
  });
  return newItem;
};

app.get("/posts/recommended", cors(corsOptions), (req, res) => {
  const userId = req.cookies?.userId;

  const postsLikedByUser = Posts.filter((post) => {
    return post.likes.includes(userId) ? true : false;
  });

  const postsDislikedByUser = Posts.filter((post) =>
    post.dislikes.includes(userId)
  );

  const userFriends = [];
  postsLikedByUser.map((post) => {
    const likesList = post.likes;
    likesList.map((user) => {
      if (user !== userId && !userFriends.includes(user)) {
        userFriends.push(user);
      }
    });
  });

  let postsLikedByFriends = [];
  userFriends.map((friend) => {
    const postsLikedByFriend = Posts.filter((post) => {
      if (
        post.likes.includes(friend) &&
        !alreadyInList(postsLikedByFriends, post)
      ) {
        return true;
      }
      return false;
    });
    postsLikedByFriends = postsLikedByFriends.concat(postsLikedByFriend);
  });

  const recommendedPosts = postsLikedByFriends.filter((post) => {
    if (
      !postsLikedByUser.includes(post) &&
      !postsDislikedByUser.includes(post)
    ) {
      return true;
    }
  });

  res.status(200).send({ recommendedPosts });
});

const alreadyInList = (list, post) => {
  let isInList = false;
  list.every((postInList) => {
    if (postInList.id !== post.id) {
      return true;
    }
    isInList = true;
    return false;
  });
  return isInList;
};

///////////////////////////////////// tags /////////////////////////////////////

app.get("/tags", cors(corsOptions), (req, res) => {
  res.send({ Tags });
});

app.post("/tags/tagName/:tagName", cors(corsOptions), (req, res) => {
  const userId = req.cookies?.userId;
  if (!userId) {
    res.status(403).end();
    return;
  }
  const { tagName } = req.params;
  if (Tags[tagName]) {
    res.status(400).end();
    return;
  }
  Tags[tagName] = [];
  res.send({ Tags }).status(200).end();
});

///////////////////////////////////// users and followers /////////////////////////////////////

app.get("/users", cors(corsOptions), (req, res) => {
  res.status(200).send({ Users });
});

app.get("/users/searchFriends/:userName", cors(corsOptions), (req, res) => {
  const { userName } = req.params;
  const filteredUsers = Users.filter((user) =>
    user.userName.includes(userName)
  );
  res.status(200).send({ filteredUsers });
});

app.put("/users/follow", cors(corsOptions), (req, res) => {
  const userId = req.cookies?.userId;
  const { userIdToFollow } = req.body.user;
  const currentUser = Users.find((user) => user.userId === userId);
  if (currentUser) {
    const index = currentUser.following.findIndex(
      (friendId) => friendId === userIdToFollow
    );
    if (index === -1) {
      currentUser.following.push(userIdToFollow);
    } else {
      currentUser.following.splice(index, 1);
    }
    res.status(200).send({ success: true });
  } else {
    res.status(400).send({ success: false, message: "user not found" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
