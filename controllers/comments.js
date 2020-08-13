let express = require('express')
let db = require('../models')
let router = express.Router()





router.post('/', (req, res)=>{
    db.comment.create(req.body)
    .then(addComment => {
        res.redirect('/articles/' + req.body.articleId)
    })
    .catch(err=>{
        console.log('Error', err)
    })

})
















module.exports = router