'use strict';
module.exports = (sequelize, DataTypes) => {
  var author = sequelize.define('author', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {});
  author.associate = function(models) {
    // associations can be defined here one author has many posts
    models.author.hasMany(models.post)
  };
  author.prototype.getFullName = function() {
    return this.firstName + ' ' + this.lastName;
  };
  return author;
};
