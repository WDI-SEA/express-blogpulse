// Require models
const db = require('./models')

// db.comment.create({
//     name: 'Paul Allen',
//     body: 'This is really neat! Thanks for posting.',
//     articleId: 1
// }).then(comment => {
//     console.log(comment.get())
// })

// db.comment.create({
//     name: 'Bob Bobbington',
//     content: 'What up',
//     articleId: 1
// }).then(comment => {
//     console.log(comment.get())
// })

// db.article.findOne({
//     where: { id: 1 },
//     include: [db.comment]
// }).then(article => {
//     console.log(article.comments)
// })