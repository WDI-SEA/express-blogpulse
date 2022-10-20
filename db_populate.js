// Importing the models foldeer which is the database
const db = require('./models')

// async function createComment() {

//     try {

//         const newComment = await db.comment.create({
//             name: 'Ahmed\'s comment',
//             content: 'This article is very cool!'
//         })

//         console.log('My new comment!', newComment)


//     }catch(err){
//         console.log(err)
//     }
// }

// createComment()


// async function createArticle() {

//     try {

//         const newArticle = await db.article.create({
//             title: 'JoJo article',
//             content: 'The new episodes of JoJo are very cool!'
//         })

//         console.log('My new article!', newArticle)


//     }catch(err){
//         console.log(err)
//     }
// }

// createArticle()



//Assoicate article with author
// async function associateArticle(){
//     try {
        
//         const [annArticle, created] = await db.article.findOrCreate({
//             where: {
//                 title: 'JoJo article'
//             }
//         })

//         const ann = await db.author.findOne({
//             where: {
//                 firstName: 'Ann'
//             }
//         })

//         await ann.addArticle(annArticle)

//     } catch (error) {
//         console.log(error)
//     }
// }

// associateArticle()



//Assoicate article with author
// async function associateComments(){
//     try {
        
//         const [ahmedComment, created] = await db.comment.findOrCreate({
//             where: {
//                 content: 'This article is very cool!'
//             }
//         })

//         const annArticle = await db.article.findOne({
//             where: {
//                 title: 'JoJo article'
//             }
//         })

//         await annArticle.addComment(ahmedComment)

//     } catch (error) {
//         console.log(error)
//     }
// }

// associateComments()