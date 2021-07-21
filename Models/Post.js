const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
    },
    
        title: {
            type: DataTypes.STRING,
            allowNull: false,
    },
     post: {
         type: DataTypes.TEXT,
         allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "category",
            key: "id"
        },
    }
    },
    {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'User',
}

);

module.exports = Post;