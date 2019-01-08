var db = require('../models');

db.comment.create({
    name: 'Paul Allen',
    content: "This is really great. thanks for posting!",
    postId: 1
  })
        .then(function(comment) {
          console.log(comment.get());
        })
        .catch(function(error) {
          res.status(400).render('main/404');
        });