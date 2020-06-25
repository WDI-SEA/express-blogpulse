var db = require('./models')

db.comment.create({
  name: 'Rick James',
  content: 'Rick James Bitch',
  articleId: 1
})
.then(function(comment) {
  console.log(comment.get())
})

