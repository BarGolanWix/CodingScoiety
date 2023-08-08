const Posts = [
  {
    id: "11",
    title: "Example Title 1",
    content: "Example content 1",
    userId: "11",
    likes: ["12", "23"],
    dislikes: ["13"],
  },
  {
    id: "12",
    title: "Example Title 2",
    content: "Example content 2",
    userId: "11",
    likes: ["1", "2"],
    dislikes: [],
  },
  {
    id: "13",
    title: "Example Title 3",
    content:
      "Example content that has more then 300 characters, Example content that has more then 300 characters, Example content that has more then 300 characters, Example content that has more then 300 characters, Example content that has more then 300 characters, Example content that has more then 300 characters",
    userId: "11",
    likes: [],
    dislikes: [],
  },
];

module.exports = { Posts };
