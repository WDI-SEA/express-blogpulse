'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.comment.belongsTo(models.article)
    }
  };
  comment.init({
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    articleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};

// CAN ALSO BE::
// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const comment = sequelize.define('comment', {
//     name: DataTypes.STRING,
//     content: DataTypes.TEXT,
//     article_id: DataTypes.INTEGER
//   },{});

//   comment.associate = function(models) {
//     //defining 1:M relationship for article and comments
//     models.comment.belongsTo(models.article)
//     models.article.hasMany(models.comment)
//   }

//   return comment;
// };