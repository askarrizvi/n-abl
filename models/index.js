const Post = require('./post');
const User = require('./user');
const PVote = require('./vote');
const CVote = require('./cvote');
const Tags = require('./tags');
const Comment = require('./comment');

// create associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Tag.hasMany(Comment, {
  foreignKey: 'tag_id'
});  

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

User.belongsToMany(Post, {
  through: Vote,
  as: 'voted_posts',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Tag.belongsToMany(Comment, {
  foreignKey: 'tag_id'
});

Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

PVote.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

PVote.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

CVote.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

CVote.belongsTo(Comment, {
  foreignKey: 'comment_id',
  onDelete: 'SET NULL'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Post.hasMany(Vote, {
  foreignKey: 'post_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Tags, {
  foreignKey: 'tag_id',
});  

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Vote, CVote, Tags, Comment };
