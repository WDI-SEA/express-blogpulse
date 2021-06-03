const db = require('./models')

// db.comment.create({
//   name: 'Siouxsie Sioux',
//   content: 'Meh!',
//   articleId: 2
// })
// .then(comment => {
//   console.log(comment.get())
// })

// db.comment.create({
//     name: 'Siouxsie Sioux',
//     content: 'Meh!',
//     articleId: 3
//   })
//   .then(comment => {
//     console.log(comment.get())
//   })

// db.article.findOne({
//   where: { id: 1 },
//   include: [db.comment]
// }).then(article => {
//   // by using eager loading, the article model should have a comments key
//   console.log(article.comments)
// })
