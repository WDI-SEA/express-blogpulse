var db = require('./models');

db.comment.create({
  name: 'Johnny Rotten',
  content: 'Bollocks!',
  postId: 1
}).then(function(comment) {
  console.log(comment.get());
});
