var express = require('express');
var db = require('../models');
var router = express.Router();

//TOD0: DEFINE SOME ROUTES

//Get all tags
router.get('/', function(req,res) {
  db.tag.findAll().then(function(tags) {
    res.render('tags/allTags', { tags: tags });
  });
});

router.get('/:id', function(req,res) {
  db.tag.findOne({
    where: {id: req.params.id},
    include: [db.post] //so we can pull all the posts associated with this tag
  }).then(function(tag){
    res.render('tags/show', {tag: tag});
  });
});

//Get particular tag (by ID)

//Edit a particular tag (by ID)

//Delete a particular tag (by ID)

//when somebody requires this file, give them this variable
module.exports = router;
