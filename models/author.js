'use strict';
module.exports = function(sequelize, DataTypes) {
  var author = sequelize.define('author', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        //each author can have many posts
        models.author.hasMany(models.post);
      }
    },
    instanceMethods: {
      getFullName: function() {
        return this.firstName + ' ' + this.lastName;
      }
    }
  });
  return author;
};
