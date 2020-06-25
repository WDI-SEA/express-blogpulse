'use strict';
module.exports = (sequelize, DataTypes) => {
  const articlesTag = sequelize.define('articlesTag', {
    articleId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  articlesTag.associate = function(models) {
    // associations can be defined here
    
  };
  return articlesTag;
};