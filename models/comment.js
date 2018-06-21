'use strict';
module.exports = (sequelize, DataTypes) => {
  var comment = sequelize.define('comment', {
    name: DataTypes.STRING,
    content: {
      type: DataTypes.TEXT,
      validate: {
        len: { 
          args: [20,200], 
          msg: "Your comment must have atleast 20 characters and fewer than 200"
        }
      }
    },
    postId: DataTypes.INTEGER
  }, {});
  comment.associate = function(models) {
    // associations can be defined here
    models.comment.belongsTo(models.post);
  };
  return comment;
};