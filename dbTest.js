const db = require('./models')

db.comment.create({
  commentator: 'Paul Allen',
  commentContent: 'This is really neat! Thanks for posting.',
  commentedOn: 1
})
.then(function(comment) {
  console.log(comment.get())
})

// db.article.findOne({
//     where: { id: 1 },
//     include: [db.comment]
//   }).then(function(article) {
//     // by using eager loading, the article model should have a comments key
//     console.log(article.comments)
//   })