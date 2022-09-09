let express = require('express')
const { Model } = require('sequelize')
let db = require('../models')
let router = express.Router()

//POST /comments- create a new comment
router.post('/:id', async (req, res) => {
    try{
        console.log(req.body)
        await db.comment.create({
            name: req.body.name,
            content: req.body.content,
            articleId: req.body.articleID
        })
        res.redirect(`/article/${req.body.articleID}`)
    } catch(error) {
        console.warn(error)
        res.status(400).render('main/404')
    }
})

module.exports = router