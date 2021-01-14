'use strict'

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define('article', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    authorId: DataTypes.INTEGER
  }, {})
  article.associate = function(models) {
    // associations can be defined here
    models.article.belongsTo(models.author)
    models.article.hasMany(models.comment)
  };
  article.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'article',
  })
  return article;
}
