var express = require('express');
var db = require('../models');
var router = express.Router();

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

module.exports = router;
