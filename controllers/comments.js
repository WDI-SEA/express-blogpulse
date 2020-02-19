var express = require('express')
var db = require('../models')
var router = express.Router()

// POST /comments - create a new post
router.post('/:id', function(req, res) {
    db.comment.create({
            name: req.body.name,
            content: req.body.content,
            articleId: req.params.id
        })
        .then(function(comments) {
            res.redirect(`/articles/${req.params.id}`)
        })
        .catch(function(error) {
            res.status(400).render('main/404')
        })
})
module.exports = router