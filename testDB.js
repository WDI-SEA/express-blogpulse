var db = require('./models')

// db.comment.create({
//   userName: 'Paul Allen',
//   content: 'This is really neat! Thanks for posting.',
//   articleId: 1
// })
// .then(function(comment) {
//   console.log(comment.get())
// })

//testing that we can query comments off of articles
// //we can do this with the id of the article
// db.article.findOne({
//     where: { id: 1 },
//     include: [db.comment]
//   }).then(function(article) {
//     // by using eager loading, the article model should have a comments key
//     console.log(article.comments)
//   })

// db.comment.create({
//     name: "Willie Nelson",
//     content: "i love it",
//     articleId: 2
//   })
//   .then(function(comment) {
//     console.log(comment.get())
//   })

db.article.findOne({
    where: { id: 1 },
    include: [db.comment]
  }).then(function(article) {
    // by using eager loading, the article model should have a comments key
    console.log(article.comments)
  })