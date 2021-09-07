const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Comment, Cvote, User, Tag } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Comment.findAll({
    attributes: [
      'id',
      'comment_text',
      'post_id',
      'tag_id',
      [sequelize.literal('(SELECT COUNT(*) FROM cvote WHERE comments.id = cvote.comment_id)'), 'cvote_count'],
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Tag,
        attributes: ['tag_text']
      }
    ]
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/tag/:tagid', (req, res) => {
  Comment.findAll({
    where: {
      tag_id: req.params.tagid
    },
    attributes: [
      'id',
      'comment_text',
      'post_id',
      'tag_id',
      [sequelize.literal('(SELECT COUNT(*) FROM cvote WHERE comment.id = cvote.comment_id)'), 'cvote_count'],
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Tag,
        attributes: ['tag_text']
      }
    ]
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
  Comment.create({
    comment_text: req.body.comment_text,
    tag_id: req.body.tag_id,
    user_id: req.session.user_id,
    post_id: req.body.post_id
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/upvote', withAuth, (req, res) => {
  // custom static method created in models/Post.js
  Comment.upvote({ ...req.body, user_id: req.session.user_id }, { Cvote, User })
    .then(updatedVoteData => res.json(updatedVoteData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
