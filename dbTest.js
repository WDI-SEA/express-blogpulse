const db = require('./models')

db.comment.create({
  commentator: 'David Cabassa',
  commentContent: 'SO GLAD for the new bike lanes! Lets turn ALL the streets into bike lanes!',
  articleId: 1
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