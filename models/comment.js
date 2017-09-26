'use strict';
module.exports = (sequelize, DataTypes) => {
  var comment = sequelize.define('comment', {
    name: DataTypes.STRING,
    content: DataTypes.STRING,
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
