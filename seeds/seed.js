const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");;

const seedMe = async () => {
  await sequelize.sync({ force: true });
  const userData = [
    {
      username: "username1",
      password: "password",
    },
    {
      username: "username2",
      password: "password",
    },
    {
      username: "username3",
      password: "password",
    },
    {
      username: "username4",
      password: "password",
    },
  ];

  const userSeeds = await User.bulkCreate(userData, {
    individualHooks: true,
  });

  console.table(userSeeds.map((usr) => usr.toJSON()));
  console.log("==============================");
  const postData = [
    {
      title: "Title 1",
      contents: "Here is contents for title 1",
      UserId: 1,
    },
    {
      title: "Title 2",
      contents: "Here is contents for title 2",
      UserId: 2,
    },
    {
      title: "Title 3",
      contents: "Here is contents for title 3",
      UserId: 3,
    },
    {
      title: "Title 4",
      contents: "Here is contents for title 4",
      UserId: 1,
    },
  ];
  const postSeeds = await Post.bulkCreate(postData);
  console.table(postSeeds.map((club) => club.toJSON()));
  console.log("==============================");
  const commentData = [
    {
      contents: "Awesome post!",
      UserId: 2,
      PostId: 1,
    },
    {
      contents: "Cool post!",
      UserId: 3,
      PostId: 2,
    },
    {
      contents: "Ok post!",
      UserId: 4,
      PostId: 3,
    },
    {
      contents: "Wicked post!",
      UserId: 4,
      PostId: 4,
    },
  ];

  const commentSeeds = await Comment.bulkCreate(commentData);
  console.table(commentSeeds.map((club) => club.toJSON()));
  console.log("==============================");
  process.exit(0);
};

seedMe();
