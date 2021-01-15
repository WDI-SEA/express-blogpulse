let db = require('./models')
const article = require('./models/article')

db.comment.create({
    name: 'nick quandt',
    comment: 'this is neat',
    articleId: 1
}).then(comment => {
    console.log(comment)
    process.exit()
})
db.article.findOne({
    where: {id: 1},
    include: [db.comment]
}).then(article => {
    console.log(article.comments)
    process.exit
})