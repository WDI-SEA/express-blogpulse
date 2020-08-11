const db = require('./models')

// db.comment.create({
//     author: 'Paul Allen',
//     content: 'You sir win one internets for todays! huehuehue',
//     articleID: 1
// }).then(comment => {
//     console.log(comment.get());
// })

db.article.findOne({
    where: {id: 1},
    include: [db.comment]
}).then(article => {
    console.log(article.comments.get)
})

// db.article.findOne().then(article => {
//     article.createComment({
//         author: 'Some lady',
//         content: 'i agree actually',
//         articleId: 3
//     }).then(comment => {
//         console.log(comment.content)
//     })
// })