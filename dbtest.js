const db = require('./models')

// db.comment.create({
//     name: 'Nick Quandt',
//     content: 'This is really neat! Thanks for posting.',
//     articleId: 1
// }).then(comment => {
//     console.log(comment)
//     process.exit()
// })

db.article.findOne({
    where: {id: 1},
    include: [db.comment]
}).then(article => {
    console.log(article.comments)
    process.exit()
})