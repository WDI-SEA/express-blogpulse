// const db = require('./models')

// db.comment.create({
//   name: 'Levin Batallones',
//   content: 'Zero to Software Engineer.',
//   articleId: 2
// })
// .then(function(comment) {
//   console.log(comment.get())
// })

// db.article.findOne({
//   where: { id: 2 },
//   include: [db.comment]
// }).then(function(article) {
//   // by using eager loading, the article model should have a comments key
//   console.log(article.comments)
// })