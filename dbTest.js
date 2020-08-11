var db = require('./models')

db.comment.create({
  name: 'Lizz West',
  content: 'Please let this deliverable be as easy as I hope it is.',
  articleId: 1
})
.then(function(comment) {
  console.log(comment.get())
})