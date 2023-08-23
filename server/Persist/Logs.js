const Logs = {
  login: [
    {
      userId: "11",
      operation: "Login",
      time: new Date(new Date(new Date().getTime() - 24 * 60 * 60 * 1000)),
      id: `${this.operation}-${this.time}`,
    },

    {
      userId: "12",
      operation: "Login",
      time: new Date(new Date(new Date().getTime() - 25 * 60 * 60 * 1000)),
      id: `${this.operation}-${this.time}`,
    },
  ],
  signOut: [
    {
      userId: "12",
      operation: "Sign Out",
      time: new Date(),
      id: `${this.operation}-${this.time}`,
    },
  ],
  addNewPost: [
    {
      userId: "24",
      operation: "Add New Post",
      time: new Date(new Date(new Date().getTime() - 43 * 60 * 60 * 1000)),
      id: `${this.operation}-${this.time}`,
    },
    {
      userId: "27",
      operation: "Add New Post",
      time: new Date(),
      id: `${this.operation}-${this.time}`,
    },
  ],
};

module.exports = { Logs };
