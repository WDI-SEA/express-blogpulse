let express = require('express')
let db = require('../models')
let router = express.Router()

router.post('/', async (req, res) => {
    try {
        await db.comment.create({
            name: req.body.name,
            content: req.body.content,
            articleId: req.body.id
        })
        res.redirect(`/articles/1`)
    } catch(err) {
        console.log(err)
        res.status(400).render('main/404')
    }  
})
  

module.exports = router