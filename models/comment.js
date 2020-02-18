'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    articleId: DataTypes.INTEGER
  }, {});
  comment.associate = function(models) {
  	models.comment.belongsTo(models.article)
    // associations can be defined here
  };
  return comment;
};