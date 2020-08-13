let express = require('express')
let db = require('../models')
let router = express.Router()

//comments
router.post('/', (req, res) => {
    console.log(req.body, "😎")
    db.comment.create(req.body)
    .then((comment) => {
        res.redirect(`/articles/${ req.body.articleId }`)
    })
    .catch((err)=>{
        console.log(err, '😎')
    })
})

module.exports = router