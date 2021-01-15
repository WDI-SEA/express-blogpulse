const db = require('./models')

db.comment.create({
  name: 'Paul Allen',
  content: 'This is really neat! Thanks for posting.',
  articleId: 2
})
.then(comment => {
  console.log(comment.get())
})



db.article.findOne({
  where: { id: 2 },
  include: [db.comment]
}).then(article => {
  // by using eager loading, the article model should have a comments key
  console.log(article.comments)
})