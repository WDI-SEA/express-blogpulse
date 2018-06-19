var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /comments - create a new comment
router.post('/:id', function(req, res) {
  console.log('name: ', req.body.name, 'content: ', req.body.content, 'id: ', req.params.id);

  db.post.findById(req.params.id).then((post) => {
    post.createComment({
      name: req.body.name,
      content: req.body.content,
      postId: req.params.id
    }).then((comment) => {
      res.redirect('/posts/' + req.params.id);
    });
  });
});


module.exports = router;
