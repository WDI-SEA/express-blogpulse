let express = require('express')
let db = require('../models')
let router = express.Router()


router.post('/', (req,res)=> {
    db.comment.create(req.body)
    .then((comment)=> {
        res.redirect(`/articles/${req.body.articleId}`)
    })
})

module.exports = router