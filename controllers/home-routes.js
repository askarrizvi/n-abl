const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote, Tag } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for homepage
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
    attributes: [
      'id',
      'post_text',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: [
          'id',
          'comment_text',
          'post_id',
          'user_id',
          'tag_id',
          'created_at',
          [sequelize.literal('(SELECT COUNT(*) FROM cvote WHERE comments.id = cvote.comment_id)'), 'cvote_count']],
        include: [{
          model: User,
          attributes: ['username']
        },
        {
          model: Tag,
          attributes: ['tag_text']
        }
        ]
      },
      {
        model: User,
        attributes: ['username']
      }
    ],
    order: [
      ['id', 'DESC'],
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));

      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_text',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        attributes: [
          'id',
          'comment_text',
          'post_id',
          'user_id',
          'tag_id',
          'created_at',
          [sequelize.literal('(SELECT COUNT(*) FROM cvote WHERE comments.id = cvote.comment_id)'), 'cvote_count']],
        include: [{
          model: User,
          attributes: ['username']
        },
        {
          model: Tag,
          attributes: ['tag_text']
        }
        ]
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = dbPostData.get({ plain: true });

      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post
router.get('/post/:id/:tagid', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'post_text',
      'title',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    include: [
      {
        model: Comment,
        where: {
          tag_id: req.params.tagid
        },
        attributes: [
          'id',
          'comment_text',
          'post_id',
          'user_id',
          'tag_id',
          'created_at',
          [sequelize.literal('(SELECT COUNT(*) FROM cvote WHERE comments.id = cvote.comment_id)'), 'cvote_count']],
        include: [{
          model: User,
          attributes: ['username']
        },
        {
          model: Tag,
          attributes: ['tag_text']
        }
        ]
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = dbPostData.get({ plain: true });

      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('/newpost', withAuth, (req, res) => {
  if (req.session.loggedIn) {
    res.render('create-post');
    return;
  }

  res.redirect('/');
});

module.exports = router;
