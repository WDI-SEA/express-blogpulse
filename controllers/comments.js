var express = require('express');
var db = require('../models');
var router = express.Router();
var postId = 0;

router.delete('/:id', function(req, res) {
  db.comment.find({
    where: { id: req.params.id } //find the associated post by id number
  }).then(function(comment){
    console.log(comment);
    postId = comment.postId;
    db.comment.destroy({
      where: { id: req.params.id } //find the associated post by id number
    }).then(function(comment) { //load child
        // res.redirect('/posts/' + req.params.id);
        req.method = 'get';
    res.redirect('/posts/'+ postId);
    });
  });
});
// });

module.exports = router;
