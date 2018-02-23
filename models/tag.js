'use strict';
module.exports = (sequelize, DataTypes) => {
  var tag = sequelize.define('tag', {
    name: DataTypes.STRING
  }, {});
  tag.associate = function(models) {
    models.tag.belongsToMany(models.post, {through: models.posts_tags});
  };
  return tag;
};
