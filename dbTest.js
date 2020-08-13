 
 //______________ PSA THIS PAGE DOES NOT AFFECT THE BLOGPULSE PAGE. 
 //______________ONLY FOR TESTING AND CONSOLE LOGGING THE DATABASE TO FIND INFORMATION!!
 
 const db = require('./models')

// db.article.findOne()
// .then(foundArticle=>{
//     foundArticle.createComment({
//         name: 'Adam',
//         content: 'I listened to a beach tune this morning'
//     })
//     .then(createdComment=>{
//         console.log(createdComment.get())
//     })
// })

//finds article where id is 1/first comment
//can change id to 2 to find second comment, etc...
db.article.findOne({
    where: {id: 1},
    include: [db.comment]
})
.then(article=>{
    article.comments.forEach(comment=>{
        console.log(comment.get())
    })
})
