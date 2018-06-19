var db = require('./models');

db.comment.create({
  name: 'Scott Ammon',
  content: 'This is okay. Blah blah blah.',
  postId: 1
}).then(function(comment) {
  console.log(comment.get());
});