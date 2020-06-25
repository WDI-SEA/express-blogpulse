// var db = require('./models')

// db.comment.create({
//   name: 'Elon Musk',
//   content: 'SMOKE WEED NAME KIDS WEIRD THINGS',
//   articleId: 3
// })
// .then(function(comment) {
//   console.log(comment.get())
// })

// // var db = require('./models')

// db.article.findOne({
//   where: { id: 3 },
//   include: [db.comment]
// }).then(function(article) {
//   // by using eager loading, the article model should have a comments key
//   console.log(article.comments)
// })