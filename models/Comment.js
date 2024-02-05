const { Model, DataTypes } = require(`sequelize`);
const User = require("./User");
const Post = require("./Post");
const sequelize = require(`../config/connection`);

class Comment extends Model {}

Comment.init({
  contents: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  PostId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Post,
      key: "id",
    },
  },
});

module.exports = Comment;
