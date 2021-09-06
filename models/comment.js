const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {
  static upvote(body, models) {
    return models.Cvote.create({
      user_id: body.user_id,
      comment_id: body.comment_id
    }).then(() => {
      return Comment.findOne({
        where: {
          id: body.comment_id
        },
        attributes: [
          'id',
          'comment_text',
          'created_at',
          [sequelize.literal('(SELECT COUNT(*) FROM cvote WHERE comment.id = cvote.comment_id)'), 'cvote_count']
        ],
        /*include: [
          {
            model: models.Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: models.User,
              attributes: ['username']
            }
          }
        ]*/
      });
    });
  }
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

module.exports = Comment;
