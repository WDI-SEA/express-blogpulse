let express = require('express')
let db = require('../models')
let router = express.Router()

router.post('/:id', async (req, res)=>{
    try{
        console.log(req.body)
        await db.comment.create({
            name: req.body.name,
            content: req.body.content,
            articleId: req.body.articleId
        })
        res.redirect(`/articles/${req.body.articleId}`)
    } catch(err){
        console.warn(err)
        res.send('Whoopsy that comment broke your page')
    }
})







module.exports = router