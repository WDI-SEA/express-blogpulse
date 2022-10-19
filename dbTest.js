// const db = require("./models")

// // async function addComment(){
// //     const added_comment = await db.comment.create({
// //         content:"I love football",
// //         name: "Jonathan",
// //         articleId: 1 
// //     })
// //     console.log("hi" + added_comment)
// // }

// async function getArticle(){
//     const foundArticle = await db.article.findOne(
//         {
//             where:{id:2},
//             include:[db.comment]//it will include it as a object property
//         }
//     ).then(
//     foundArticle=>{
//         console.log(foundArticle.comments)
//     }
//     )
// }
// const readArticles = async () => {
//   try {
//     const article = await db.article.findOne({
//       where: { id: 2},
//     })
//     console.log(article)
//   } catch (err) {
//     console.log(err)
//   }
// }

// readArticles();