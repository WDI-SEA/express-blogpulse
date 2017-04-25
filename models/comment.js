'use strict';
module.exports = function(sequelize, DataTypes) {
    var comment = sequelize.define('comment', {
        name: DataTypes.STRING,
        content: DataTypes.TEXT,
        postId: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.post.hasMany(models.comment);

            }
        }
    });
    return comment;
};
