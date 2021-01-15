'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    articleId: DataTypes.INTEGER
  }, {})
 

    // static associate(models) {
    //   // define association here
    // }
    comment.associate = function(models) {
      models.comment.belongsTo(models.article)
    }
    return comment
  };
//   comment.init({
//     name: DataTypes.STRING,
//     content: DataTypes.TEXT,
//     article: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'comment',
//   });
//   return comment;
// };