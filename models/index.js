const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'User_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'User_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'User_id'
});

Post.hasMany(Comment, {
  foreignKey: 'Post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
    foreignKey: 'Post_id'
});

module.exports = { User, Post, Comment };

