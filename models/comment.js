'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    name: DataTypes.STRING,
    comment: DataTypes.TEXT,
    articleId: DataTypes.INTEGER
  }, {});
  comment.associate = function(models) {
    // associations can be defined here
    models.comment.belongsTo(models.article)
  };
  return comment;
};