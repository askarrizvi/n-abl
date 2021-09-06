const Post = require('./post');
const User = require('./user');
const Vote = require('./vote');
const Cvote = require('./cvote');
const Tag = require('./tag');
const Comment = require('./comment');

// create associations
User.hasMany(Post, {
  foreignKey: 'user_id'
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

Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Vote.belongsTo(Post, {
  foreignKey: 'post_id',
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

User.belongsToMany(Comment, {
  through: Cvote,
  as: 'voted_comments',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsToMany(User, {
  through: Cvote,
  as: 'voted_comments',
  foreignKey: 'comment_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

Cvote.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Cvote.belongsTo(Comment, {
  foreignKey: 'comment_id',
  onDelete: 'SET NULL'
});

User.hasMany(Cvote, {
  foreignKey: 'user_id'
});

Comment.hasMany(Cvote, {
  foreignKey: 'comment_id'
});

Tag.hasMany(Comment, {
  foreignKey: 'tag_id'
});  

Comment.belongsTo(Tag, {
  foreignKey: 'tag_id',
});  

module.exports = { User, Post, Vote, Cvote, Tag, Comment };
