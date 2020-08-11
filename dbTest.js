const db = require('./models')

// db.comment.create({
//     author: 'Paul Allen',
//     content: 'You sir win one internets for todays! huehuehue',
//     articleID: 1
// }).then(comment => {
//     console.log(comment.get());
// })

// db.article.findOne({
//     where: {id: 1},
//     include: [db.comment]
// }).then(article => {
//     console.log(article.comments)
// })

// db.article.findOne().then(article => {
//     article.createComment({
//         author: 'Some dog',
//         content: 'bark bark bark',
//         articleId: 2
//     }).then(comment => {
//         console.log(comment.content)
//     })
// })

// db.article.findOne({
//     where: {id: 1}
// })
// .then(article=>{
//     article.createComment({
//         author: 'aiden bryce taylor',
//         content: 'today is my dads birday!:)',
//         articleId: article.id
//     })
//     .then(comment=>{
//         console.log(`created the comment : ${comment.content}`)
//     })
// })

db.article.findOne({
    where: {id:1},
    include: [db.comment]
}).then(article=>{
    console.log(article.comments)
})