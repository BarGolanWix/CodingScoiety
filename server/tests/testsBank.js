let cookieDate =
  "userId=1; accessToken=j%3A%7B%22secret%22%3A%22977685c5-de4c-497e-974b-61dcd7664dfe%22%2C%22expirationDate%22%3A%222030-08-23T21%3A41%3A00.503Z%22%7D";

const headers = {
  Cookie: cookieDate,
  // "content-type": "application/x-www-form-urlencoded",
};

const tests = {
  autorization: [
    { name: "Root", method: "GET", route: "/", data: {}, expected: "Welcome!" },
    {
      name: "Sign Up",
      method: "POST",
      route: "/signUp",
      data: {
        account: {
          userName: "Bar",
          password: "Aa123456",
          profileImage: "/images/default-profile-image.png",
        },
      },
    },
    {
      name: "Login",
      method: "POST",
      route: "/credentialsCheck",
      data: {
        account: {
          userName: "Bar",
          password: "Aa123456",
          rememberMe: false,
        },
      },
    },
    {
      name: "Auto Login",
      method: "GET",
      route: "/autoCredentialsCheck",
      data: {},
      headers,
    },
    {
      name: "Get user ID from the server",
      method: "GET",
      route: "/getUserId",
      data: {},
      headers,
    },
  ],
  posts: [
    {
      name: "Get Posts",
      method: "GET",
      route: "/posts",
      data: {},
      headers,
    },
    {
      name: "Add new Post",
      method: "POST",
      route: "/posts",
      data: {
        post: { id: "test", title: "test", content: "test", selectedTag: "" },
      },
      headers,
    },
    {
      name: "Delete Post",
      method: "DELETE",
      route: "/deletePost",
      params: {
        postId: "11",
      },
      headers,
    },
    {
      name: "Add tag to a post",
      method: "POST",
      route: "/posts/tags",
      params: {
        option: "Frontend",
        postId: "11",
      },
      headers,
    },
    {
      name: "Like / dislike a post",
      method: "POST",
      route: "/posts/likesDislikes",
      data: {
        postId: "12",
        postLikes: ["12", "23", "ed832cad-3fdd-479e-8e82-35f02d78ef0a"],
        postDislikes: ["13", "11"],
        didUserLikePost: true,
        didUserDislikePost: false,
      },
      headers,
    },
    {
      name: "Get recommended posts",
      method: "GET",
      route: "/posts/recommended",
      data: {},
      headers,
    },
  ],
  tags: [
    {
      name: "Get tags from database",
      method: "GET",
      route: "/tags",
      data: {},
      headers,
    },
    {
      name: "Create a new tag",
      method: "POST",
      route: "/tags/tagName/:Test",
      data: {},
      headers,
    },
  ],
  users_followers: [
    {
      name: "Get Users in range",
      method: "GET",
      route: "/users",
      data: {},
      params: { usersRange: { base: 0, limit: 10 } },
      headers,
    },
    {
      name: "Search for users",
      method: "GET",
      route: "/users/searchFriends/:J",
      data: {},
      headers,
    },
    {
      name: "Follow a user",
      method: "PUT",
      route: "/users/follow",
      data: { user: { userNameToFollow: "Lisa" } },
      headers,
    },
    {
      name: "Delete user",
      method: "DELETE",
      route: "/deleteUser",
      data: {},
      params: {
        userId: "12",
      },
      headers,
    },
  ],
  minesweeper: [
    {
      name: "Store new highscore",
      method: "PUT",
      route: "/mineSweeper/storeHighscore",
      data: { score: 777 },
      headers,
    },
    {
      name: "Gets the leaderboard",
      method: "GET",
      route: "/mineSweeper/getLeaderBoardData",
      data: {},
      headers,
    },
  ],
  admin_operations: [
    {
      name: "Store app configuration",
      method: "PUT",
      route: "/configuration/store",
      data: { functionality: { checkboxId: "addNewPost", checkedSts: true } },
      headers,
    },
    {
      name: "Gets tha aapp's configuration",
      method: "GET",
      route: "/configuration/get",
      data: {},
      headers,
    },
    {
      name: "Gets logs by options",
      method: "GET",
      route: "/logs/get",
      data: {},
      params: {
        logsOptions: [
          { id: "login", label: "Logins", checked: false },
          { id: "signOut", label: "SignOuts", checked: false },
          { id: "addNewPost", label: "New Posts", checked: false },
        ],
      },
      headers,
    },
  ],
  logout: [
    {
      name: "Log Out",
      method: "PUT",
      route: "/logout",
      data: {},
      headers,
    },
  ],
};

module.exports = tests;
