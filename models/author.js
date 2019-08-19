'use strict'

module.exports = (sequelize, DataTypes) => {
  const author = sequelize.define('author', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {})

  author.associate = (models) => {
    // associations can be defined here
    models.author.hasMany(models.article)
  }

  author.prototype.getFullName = () => {
    return this.firstName + ' ' + this.lastName
  }
  return author
}
