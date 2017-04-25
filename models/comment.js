'use strict';
module.exports = function(sequelize, DataTypes) {
    var comment = sequelize.define('comment', {
        name: DataTypes.TEXT,
        content: DataTypes.TEXT,
        comment: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.comment.belongsTo(models.post);
            }
        }
    });
    return comment;
};
