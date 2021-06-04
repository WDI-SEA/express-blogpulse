'use strict'
module.exports = (sequelize, DataTypes) => {
  const author = sequelize.define('author', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {})

  author.associate = function(models) {
    models.author.hasMany(models.article)
  }

  author.prototype.getFullName = function(){
    return this.firstName + ' ' + this.lastName
  }
  return author
}
