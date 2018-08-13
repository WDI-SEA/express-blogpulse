'use strict';
module.exports = (sequelize, DataTypes) => {
  var post = sequelize.define('post', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    authorId: DataTypes.INTEGER
  }, {});
  post.associate = function(models) {
    // associations can be defined here POST
    models.post.belongsTo(models.author);
    models.post.hasMany(models.comment);
    models.post.belongsToMany(models.tag, {through: 'postsTags'});
  };
  return post;
};
