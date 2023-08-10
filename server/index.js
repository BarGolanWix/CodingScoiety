const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const { baseUrl } = require("../constants");
const { Posts } = require("./model/Posts");
const { Tags } = require("./model/Tags");
const { Users } = require("./model/Users");
const { Credentials } = require("./model/Credentials");

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

///////////////////////////////////// user authorization /////////////////////////////////////

app.get("/", cors(corsOptions), (req, res) => {
  res.send("Welcome!");
});

app.post("/credentialsCheck", cors(corsOptions), (req, res) => {
  const { userName, password, rememberMe } = req.body.account;

  const user = Credentials.find(
    (user) => user.userName === userName && user.password === password
  );

  if (user) {
    const newAccessToken = generateAccessToken(rememberMe);
    user.accessToken = newAccessToken;
    res.cookie("userId", user.userId);
    res.cookie("accessToken", newAccessToken);
    res.send({ success: true, authorization: user.authorization });
  } else {
    res.status(400).send({
      success: false,
      authorization: "unauthorized",
    });
  }
});

app.use((req, res, next) => {
  let currentAccessToken = req.cookies?.accessToken;
  const currentUserId = req.cookies?.userId;
  const userInDisc = Credentials.find((user) => user.userId === currentUserId);
  if (userInDisc) {
    const currentTime = new Date();
    const expirationTime = new Date(
      JSON.parse(userInDisc.accessToken).expirationDate
    );
    const userInDiscAccessToken = JSON.parse(userInDisc.accessToken);
    currentAccessToken = JSON.parse(currentAccessToken);
    if (
      userInDiscAccessToken.secret === currentAccessToken.secret &&
      currentTime < expirationTime
    ) {
      next();
    } else {
      res.status(401).send({ success: false, message: "invalid access token" });
    }
  } else {
    res.status(401).send({ success: false, message: "invalid access token" });
  }
});

app.get("/user", cors(corsOptions), (req, res) => {
  const userId = req.cookies?.userId;
  res.send({ id: userId });
});

///////////////////////////////////// posts /////////////////////////////////////

app.get("/posts", cors(corsOptions), (req, res) => {
  const currentUser = findUserWithCookie(req.cookies?.userId);
  let { popularity, tag } = req.query;
  let filteredPosts = JSON.parse(JSON.stringify(Posts));

  filteredPosts = filteredPosts.filter(
    (post) =>
      currentUser.following.includes(post.writer) ||
      post.writer === currentUser.userName
  );

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
    writer: userId,
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
  const userId = req.cookies?.userId;
  const usersWithoutCurrentUser = Users.filter(
    (user) => user.userId !== userId
  );
  const followedUsers = findUserWithCookie(userId).following;
  res.status(200).send({ usersWithoutCurrentUser, followedUsers });
});

app.get("/users/searchFriends/:keyword", cors(corsOptions), (req, res) => {
  const userId = req.cookies?.userId;
  const { keyword } = req.params;
  const filteredUsers = Users.filter(
    (user) => user.userName.includes(keyword) && user.userId !== userId
  );
  const followedUsers = findUserWithCookie(req.cookies?.userId).following;

  res.status(200).send({ filteredUsers, followedUsers });
});

app.put("/users/follow", cors(corsOptions), (req, res) => {
  const userId = req.cookies?.userId;
  const currentUser = findUserWithCookie(userId);
  const { userNameToFollow } = req.body.user;
  if (currentUser) {
    const index = currentUser.following.findIndex(
      (friend) => friend === userNameToFollow
    );
    if (index === -1) {
      currentUser.following.push(userNameToFollow);
    } else {
      currentUser.following.splice(index, 1);
    }
    res.status(200).send({ success: true, following: currentUser.following });
  } else {
    res.status(400).send({ success: false, message: "user not found" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

///////////////////////////////////// write to disc /////////////////////////////////////

function writeDataToFile(filename, data) {
  fs.writeFile(filename, data, (err) => {
    if (err) {
      console.error(`Error writing to ${filename}:`, err);
    } else {
      console.log(`Data written to ${filename}`);
    }
  });
}

setInterval(() => {
  writeDataToFile(
    "./model/Posts.js",
    `const Posts = ${JSON.stringify(Posts)}; module.exports = { Posts }`
  );
  writeDataToFile(
    "./model/Tags.js",
    `const Tags = ${JSON.stringify(Tags)}; module.exports = { Tags }`
  );
  writeDataToFile(
    "./model/Users.js",
    `const Users = ${JSON.stringify(Users)}; module.exports = { Users }`
  );
  writeDataToFile(
    "./model/Credentials.js",
    `const Credentials = ${JSON.stringify(
      Credentials
    )}; module.exports = { Credentials }`
  );
}, 30000);

///////////////////////////////////// helper functions /////////////////////////////////////

function findUserWithCookie(userId) {
  return Users.find((user) => user.userId === userId);
}

function generateAccessToken(rememberMe) {
  const expirationDate = new Date();
  if (rememberMe) {
    expirationDate.setHours(expirationDate.getHours() + 1000);
  } else {
    expirationDate.setHours(expirationDate.getHours() + 1000);
  }

  const accessToken = uuidv4();
  let newAccessToken = {
    secret: accessToken,
    expirationDate: expirationDate,
  };
  newAccessToken = JSON.stringify(newAccessToken);

  return newAccessToken;
}

const findMissmatch = (originalList, newList) => {
  newItem = -1;
  newList.forEach((value) => {
    if (!originalList.includes(value)) {
      newItem = value;
    }
  });
  return newItem;
};
