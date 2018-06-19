'use strict';
module.exports = (sequelize, DataTypes) => {
  var author = sequelize.define('author', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {});
  author.associate = function(models) {
    // associations can be defined here
  };
  author.prototype.getFullName = function() {
        return this.firstName + ' ' + this.lastName;
      };
  return author;
};