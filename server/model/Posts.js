const Posts = [
  {
    id: "11",
    writer: ["11", "Jhon"],
    title: "Example Title 1",
    content: "Example content 1",
    userId: "11",
    likes: ["12", "23", "ed832cad-3fdd-479e-8e82-35f02d78ef0a"],
    dislikes: ["13", "11"],
  },
  {
    id: "12",
    writer: ["12", "Lisa"],
    title: "Example Title 2",
    content: "Example content 2",
    userId: "11",
    likes: ["1", "2"],
    dislikes: [],
  },
  {
    id: "13",
    writer: ["ed832cad-3fdd-479e-8e82-35f02d78ef0a", "Jonathan"],
    title: "Example Title 3",
    content:
      "Example content that has more then 300 characters, Example content that has more then 300 characters, Example content that has more then 300 characters, Example content that has more then 300 characters, Example content that has more then 300 characters, Example content that has more then 300 characters",
    userId: "11",
    likes: ["ed832cad-3fdd-479e-8e82-35f02d78ef0a"],
    dislikes: ["11"],
  },
];
module.exports = { Posts };
