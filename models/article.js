'use strict'
module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define('article', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    authorId: DataTypes.INTEGER
  }, {})
  article.associate = (models) => {
    // associations can be defined here
    models.article.belongsTo(models.author)
  }
  return article
}
