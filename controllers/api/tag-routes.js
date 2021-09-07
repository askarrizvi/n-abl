const router = require('express').Router();
const { Tag } = require('../../models');

router.post('/', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  Tag.create({
    tag_text: req.body.tag_text,
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

module.exports = router;
