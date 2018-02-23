// COMMENTS controller

var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /comments - display all authors
router.post('/', function(req, res) {
  // console.log('in the /comments path...');
  db.comment.create({
    name:req.body.name,
    content:req.body.content,
    postId:req.body.postId
  })
  .then(function(comment){
    res.redirect('posts/' + comment.postId);
  })
  .catch(function(error){
    res.status(400).render('main/404');
  });
});

// GET
router.get('/:id/edit', function(req, res){
  db.comment.findOne({
    where: { id:req.params.id }
  })
  .then(function(comment){
    res.render('comments/edit', {comment:comment});
  });
});

// DELETE
router.delete('/delete/:id', function(req,res){
  // console.log('in delete/id path');
    var deleteComment = {
      id: req.params.id
    }
    db.comment.destroy({
      where: {id:deleteComment.id}
    }).then(function(comment){
      console.log("successfully deleted..." + deleteComment.id);
      // res.method = "get";
      // res.redirect('/post/)
    });
});

// PUT
router.put('/update/:id', function(req,res){
  // console.log(req.params.id);
  db.comment.findById(req.params.id)
  .then(function(comment){
    console.log(comment);
    db.comment.update({
      content:req.body.content
    },{
      where: {id:req.params.id}
    }).then(function(comment){
      res.send('successfully updated');
    });
  });
});


module.exports = router;
