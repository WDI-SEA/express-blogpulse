// var db = require('./models')

// db.comment.create({
//   name: 'Bob Dylan',
//   content: 'The andswer, my friend, is blowin in the wind.',
//   articleId: 1
// })
// .then(function(comment) {
//   console.log(comment.get())
// })

var db = require('./models')

db.article.findOne({
  where: { id: 1 },
  include: [db.comment]
}).then(function(article) {
  // by using eager loading, the article model should have a comments key
  console.log(article.comments)
})