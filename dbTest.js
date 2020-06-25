var db = require('./models')

db.comment.create({
  name: 'Burger King Guy',
  content: 'It is so hard to ride my bike with these TINY hands.',
  articleId: 1
}).then(function(comment) {
  console.log(comment.get())
})

// var db = require('./models')

// db.article.findOne({
//   where: {id: 1}, 
//   include: [db.comment]
// }).then(function(article) {
//   console.log(article.comments)
// })