const Users = [
  {
    userId: "11",
    userName: "Jhon",
    profileImage: "/images/Jhon.jpg",
    posts: ["11", "12", "13"],
    following: ["Jhon", "JhonTravolta", "Jonathan", "JonathanTheKing"],
  },
  {
    userId: "111",
    userName: "JhonTravolta",
    profileImage: "/images/Jhon.jpg",
    posts: ["11", "12", "13"],
    following: ["Jhon", "Lisa", "Jonathan"],
  },
  {
    userId: "12",
    userName: "Lisa",
    profileImage: "/images/Lisa.jpg",
    posts: ["11", "12", "13"],
    following: [],
  },
  {
    userId: "13",
    userName: "JonathanTheKing",
    profileImage: "/images/Jonathan.jpg",
    posts: ["11", "12", "13"],
    following: ["JhonTravolta", "Lisa"],
  },
  {
    userId: "ed832cad-3fdd-479e-8e82-35f02d78ef0a",
    userName: "Jonathan",
    profileImage: "/images/Jonathan.jpg",
    posts: ["11", "12", "13"],
    following: ["JhonTravolta", "Jhon"],
  },
];
module.exports = { Users };
