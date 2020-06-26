'use strict'
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
    models.article.belongsToMany(models.tag, {through: "articlesTags"})
  }
  return article
}

//we are DONE with our article model DO NOT TOUCH
