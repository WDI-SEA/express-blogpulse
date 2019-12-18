var db = require('./models')

db.comment.create({
	name: 'Rebecca Evans',
	content: 'This is crap.',
	articleId: 2
})
.then(function(comment) {
  console.log(comment.get())
})


db.article.findOne({
  where: { id: 1 },
  include: [db.comment]
}).then(function(article) {
  // by using eager loading, the article model should have a comments key
  console.log(article.comments)
})