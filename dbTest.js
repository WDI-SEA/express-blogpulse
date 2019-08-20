var db = require('./models')

db.comment.create({
  name: 'Paul Allen',
  content: 'This is really neat! Thanks for posting.',
  articleId: 3
})
.then(function(comment) {
  console.log(comment.get())
})