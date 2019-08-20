let router = require('express').Router()
var db = require('../models')

router.post('/', (req, res) => {
    db.comment.create(req.body)
    .then((createdComment) => {
        res.redirect('/articles/' + req.body.articleId)
    })
    .catch ((error) => {
        console.log('Coments POST Error: ', error)
        res.send('Hmm...There was an error in posting your comments; please try again.')
    })
})

module.exports = router