// var express = require('express');
// var db = require('../models');
// var router = express.Router();

// // POST /posts/:id/comments
// router.post("/:id", function(req, res) {
//   console.log(req.body);
//   db.post.find({
//     where: {id: req.body.postId}
//   }).then(function(post) {
//     // Create comment 
//     post.createComment({
//       name: req.body.name,
//       content: req.body.content
//     }).then(function(comment) {
//       res.redirect("/posts/" + req.params.id)
//     });
//   });
// });

// module.exports = router;