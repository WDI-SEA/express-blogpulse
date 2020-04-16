'use strict'
module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define('article', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    authorId: DataTypes.INTEGER
  }, {})
  //association from article TO comments
  article.associate = function(models) {
    //associations can be defined here
    models.article.hasMany(models.comment)
  }
  article.associate = function(models) {
    // associations can be defined here
    models.article.belongsTo(models.author)
  }
  return article
}


