'use strict';
module.exports = (sequelize, DataTypes) => {
  var postTags = sequelize.define('postTags', {
    postId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return postTags;
};