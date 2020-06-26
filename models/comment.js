'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    static associate(models) {
      models.comment.belongsTo(models.article);
      models.comment.belongsTo(models.author);
    }
  };
  comment.init({
    userName: DataTypes.STRING,
    content: DataTypes.TEXT,
    articleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};