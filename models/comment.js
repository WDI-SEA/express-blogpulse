'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    postId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.comment.belongsTo(models.post);
      }
    }
  });
  return comment;
};