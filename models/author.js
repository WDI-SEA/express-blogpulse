'use strict';
module.exports = (sequelize, DataTypes) => {
  var author = sequelize.define('author', {
    firstName: {
      type: DataTypes.STRING,
    validate: {
      len: [1,99],
      msg: "You must enter a name between 1 and 99 characters."
      }
    },
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


// instead of passing in just the data type you can pass in an object
// firstName: DataTypes.STRING,>> deleted this and replace it with line 4
// http://docs.sequelizejs.com/manual/tutorial/models-definition.html#validations  for len
