var express = require('express');
var db = require('../models');
var router = express.Router();


// POST -comment to a post
router.post('/', function(req,res) {
    // determine post.id
    let postId = req.headers.referer.split('/')[4];
    db.post.find({
        where: {id: postId}
    }).then( function(post) {
        // create comment under post.id
        post.createComment({
            name: req.body.name,
            content: req.body.content
        }).then( function(data) {
            console.log(data);
            res.redirect('posts/' + postId)
        })
    })

})

// GET - moderator dash
router.get('/', function(req,res) {
    db.comment.findAll({
        include: [db.post]
    }).then( function(comments){
        res.render('comments/index', {comments})
    })
})

// DELETE - from admin page
router.delete('/:id', function (req, res) {
    db.comment.destroy({
        where: { id: req.params.id }
    }).then(function (data) {
        res.sendStatus(200);
    })
})

module.exports = router;
