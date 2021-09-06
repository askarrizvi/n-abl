const { Tag } = require('../models');

const tagdata = [
  {
    tag_text: 'General Info'
  },
  {
    tag_text: 'Humour'
  },
  {
    tag_text: 'Media'
  }
];

const seedTags = () => Tag.bulkCreate(tagdata);

module.exports = seedTags;
