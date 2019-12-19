'use strict';
module.exports = (sequelize, DataTypes) => {
  const articles_tag = sequelize.define('articles_tag', {
    articleId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  articles_tag.associate = function(models) {
    // associations can be defined here
  };
  return articles_tag;
};