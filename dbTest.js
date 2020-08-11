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

  db.author.findAll({
    include:[db.article]
  })
  .then(authors => {
    authors.forEach(author => {
      console.log('          ----------------');
      console.log(`${author.firstName} ${author.lastName}'s article(s)`);
      author.articles.forEach(article => {
        console.log(`${article.title}`);
      })
    })
  })