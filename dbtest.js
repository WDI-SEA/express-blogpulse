// const db = require('./models')

// db.comment.create({
//     name: 'Paul Melon',
//     content: 'This is really neat!',
//     article: 1
// }).then(comment => {
//     console.log(comment)
 
// })

const db = require('./models')

db.article.findOne({
  where: { id: 1 },
  include: [db.comment]
}).then(article => {
  // by using eager loading, the article model should have a comments key
  console.log(article.comments)
})