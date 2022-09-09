const db = require('./models')

// const createComment1 = async ()=>{
    // try{
        // const newComment = await db.comment.create({
            // name: 'Paul Allen',
            // content: 'This is really neat! Thanks for posting.',
            // articleId: 1
        // })
    // }catch(err){
        // console.log("here")
    // }
// }
// const createComment2 = async ()=>{
    // try{
        // const newComment = await db.comment.create({
            // name: 'Ada Lovelace',
            // content: 'So excited for this!',
            // articleId: 2
        // })
        // console.log("new comment")
    // }catch (err){
        // console.log(err)
    // }
// }
// 
const testAssociation=async ()=>{
    try{
        const test = await db.article.findOne({
            where: { id: 2},
            include: [db.author]
        })
        console.log(test)
    }catch(err){
        console.log(err)
    }
}

// createComment1()
// createComment2()
testAssociation()