'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    articleId: DataTypes.INTEGER
  }, {});
  comments.associate = function(models) {
    // associations can be defined here
    models.comments.belongsTo(models.article)
  };
  return comments;
};