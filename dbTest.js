var db = require('./models')

// ## MY SOLUTION 

// db.comment.create({
//     name: 'Paul Allen',
//     content: 'This is really neat! Thanks for posting.',
//     articleId:1
// })
// .then((comment)=> {
//     console.log(comment.get())
// })

// ## DOES NOT WORKS

// db.article.findOne({
//     where: { id: 1},
//     include: [db.comments]
// }).then((article) => {
//     console.log(article.comment);
// })



// ## TAYLOR SOLUTION FOR PART 1

// db.article.findOne()
// .then((article) => {
//     article.createComment({
//         name: 'Adam',
//         content: 'I listened to a beach tune this morning'
//     })
//     .then(createdComment => {
//         console.log(createdComment.get())
//     })
//     console.log(article.comment);
// })


// db.article.findOne({
//     where: { id: 1 },
//     include: [db.comment]
// })
// .then(article => {
//     article.comments.forEach(comment => {
//         console.log(comment.get())
//     });
// })