var db = require('./models')

// db.comment.create({
//   name: 'Felipe Lerner',
//   content: 'So great to see this investment paying off!',
//   articleId: 1
// })
// .then(function(comment) {
//   console.log(comment.get())
// })

db.article.findOne({
    where: { id: 1 },
    include: [db.comment]
  }).then(function(article) {
    // by using eager loading, the article model should have a comments key
    console.log(article.comments)
  })