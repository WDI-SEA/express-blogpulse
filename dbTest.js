var db = require('./models')

// db.comment.create({
//   name: 'Linda Amanda',
//   content: 'Thanks for sharing! That was a great point.',
//   articleId: 2
// })
// .then(function(comment) {
//   console.log(comment.get())
// })

// db.comment.findAll()
// .then(comments => {
//   comments.forEach(comment => {
//     console.log(comment.get());
//   })
// })

// db.article.findAll({
//   include:[db.comment]
// })
// .then(articles => {
//     articles.forEach(article => {
//       console.log(`${article.title} has comment(s)`);
//       article.comments.forEach((comment,index) => {
//         console.log(`${index+1}. ${comment.content}`);
//       })
//       console.log('          ----------------');
//     })
//   })

  // db.author.findAll({
  //   include:[db.article]
  // })
  // .then(authors => {
  //   authors.forEach(author => {
  //     console.log('          ----------------');
  //     console.log(`${author.firstName} ${author.lastName}'s article(s)`);
  //     author.articles.forEach(article => {
  //       console.log(`${article.title}`);
  //     })
  //   })
  // })

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

db.article.findOne({
  where: {id: 1},
  include: [db.author, db.comment]
})
.then(article=>{
  console.log(article.author.firstName);
  console.log(' wrote ');
  console.log(article.title);
  article.comments.forEach((comment, index) =>{
    console.log(index+1, ' ');
      console.log(comment.name)
      console.log(comment.content);
  })
})
