'use strict';
module.exports = function(sequelize, DataTypes) {
    var comment = sequelize.define('comment', {
        name: DataTypes.STRING,
        content: DataTypes.TEXT,
        post: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.comment.belongsTo(models.postId);
            }
        }
    });
    return comment;
};
