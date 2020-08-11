var db = require('./models')

// db.comment.create({
//     name: 'Paul Allen',
//     comment: 'This is really neat! Thanks for posting.',
//     article: 1
// })
// .then(function(comment) {
//     console.log(comment.get())
// })

db.comment.create({
    name: 'Sean Huh',
    comment: 'I like this.',
    article: 3
})
.then(function(comment) {
    console.log(comment.get())
})



db.comment.create({
    name: 'Julie Lee',
    comment: 'This must be good!',
    article: 2
})
.then(function(comment) {
    console.log(comment.get())
})


db.comment.create({
    name: 'Lancy lay',
    comment: 'I wish I am there',
    article: 1
})
.then(function(comment) {
    console.log(comment.get())
})


db.article.findOne({
    where: { id:1 },
    include: [db.comment]
}).then(function(article) {
    console.log(article.comments)
})