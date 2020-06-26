'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.tag.belongsToMany(models.article, {through: "articlesTags"}
    )}
  };
  tag.init({
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tag',
  });
  return tag;
};

//this is the part of homework where it asks us to add tags to the blogpulse app
//so we have something to work off of