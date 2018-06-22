'use strict';
module.exports = (sequelize, DataTypes) => {
  var author = sequelize.define('author', {
    firstName:{ types: DataTypes.STRING,
              validate:{
                len: [1,99]
                msg: "You must enter a name between 1 and 99 charecters"
              }
    },
    lastName: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {});
  author.associate = function(models) {
    // associations can be defined here
    models.author.hasMany(models.post);
  };
  author.prototype.getFullName = function() {
    return this.firstName + ' ' + this.lastName;
  };
  return author;
};
