import React from "react";

const AdminContext = React.createContext({
  functionalities: {
    addNewPost: {},
    exploreMorePosts: {},
    searchFriends: {},
    popularityFilter: {},
    playground: {},
  },
  handleDisableClick: null,
  getConfiguration: null,
  currLogs: null,
  handleLogsClick: null,
  logsOptions: [],
});

export default AdminContext;
