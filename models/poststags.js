'use strict';
module.exports = (sequelize, DataTypes) => {
  var postsTags = sequelize.define('postsTags', {
    postId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  postsTags.associate = function(models) {
    // associations can be defined here
  };
  return postsTags;
};