'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    articleId: DataTypes.INTEGER
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    models.user.belongsTo(models.article)
  };
  return user;
};