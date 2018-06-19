const express = require('express');
const db = require('../models');
const router = express.Router();

// ES6 arrow function express test

// GET /tags - gets all tags
router.get('/', (req,res) => {
    db.tag.findAll().then( (tags) => {
        res.render('tags/index', {tags});
    })
})

// GET /tags/new - returns new form for tags
router.get('/new', (req,res) => {
    res.render('tags/new');
})

// POST /tags - post route for new tags 
router.post('/', (req,res) => {
    db.tag.create({
        name: req.body.name
    }).then( (tag) => {
        res.redirect('/tags');
    })
})

router.get('/:id', (req,res) => {
    db.tag.findById(req.params.id).then( (tag) => {
        tag.getPosts().then( (posts) => {
            res.render('tags/show', { tag: tag, posts: posts });
        })
    })
})

module.exports = router;