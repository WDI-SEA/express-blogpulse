var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /posts - create a new post
router.post('/', function(req, res) {
    db.post.create({
            title: req.body.title,
            content: req.body.content,
            authorId: req.body.authorId
        })
        .then(function(post) {
            db.tag.findOrCreate({
                where: { name: req.body.tag }
            }).spread(function(tag, created) {
                post.addTag(tag).then(function(foo) {
                    console.log("WWWWAAAAAAAAAAZZZZZZZZZZUUUUUUUUUPPPPPPPP");
                })
            })
            res.redirect('/');
        })
        .catch(function(error) {
            res.status(400).render('main/404');
        });
});

// GET /posts/new - display form for creating new posts
router.get('/new', function(req, res) {
    db.author.findAll()
        .then(function(authors) {
            res.render('posts/new', { authors: authors });
        })
        .catch(function(error) {
            res.status(400).render('main/404');
        });
});

// GET /posts/:id - display a specific post and its author
router.get('/:id', function(req, res) {
    db.post.find({
            where: { id: req.params.id },
            include: [db.author, db.comment, db.tag]
        })
        .then(function(post) {
            if (!post) throw Error();
            res.render('posts/show', { post: post });
        })
        .catch(function(error) {
            res.status(400).render('main/404');
        });
});

//create comment within that post's id
router.post('/:id/comments', function(req, res) {
    var postId = req.params.id;
    db.comment.create({
        name: req.body.name,
        content: req.body.content,
        postId: postId
    }).then(function(comment) {
        res.redirect('../' + postId);
    }).catch(function(error) {
        res.status(400).render('main/404');
    });
});

//created a tag get - returns all posts with a given tag
router.get('/tags/:tag', function(req, res) {
    console.log("Im in the tag get");
    db.tag.findOne({
        where: { name: req.params.tag }
    }).then(function(tag) {
        tag.getPosts().then(function(posts) {
            console.log("These posts are tagged with " + tag.name + ":");
            res.render('posts/index', { posts: posts });
        })
    })
})

module.exports = router;