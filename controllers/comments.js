var express = require('express');
var db = require('../models');
var router = express.Router();
var bodyParser = require('body-parser');

// POST /comments - create a new comment
router.post('/:id', function(req, res) {
    db.comment.create({
        name: req.body.name,
        comment: req.body.comment,
        postId: req.params.id
    }).then(function(data) {
        res.redirect('/posts/' + req.params.id);
    })
});

module.exports = router;