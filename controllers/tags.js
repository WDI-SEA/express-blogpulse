var express = require('express');
var db = require('../models');
var async = require('async');
var router = express.Router();

// TODO: define Routes

// GET all tags
router.get('/', function(req,res){
  db.tag.findAll().then(function(tags){
    res.render('tags/allTags', {tags:tags})
  });
});

// GET unique tag by ID
router.get('/:id', function(req,res){
  db.tag.findOne({
    where: {id: req.params.id},
    include: [db.post]
  }).then(function(tag){
    res.render('tags/show', {tag:tag});
  });
});


// get edit page
router.get('/:id/edit', function(req,res){
  db.tag.findById(req.params.id).then(function(tag){
    res.render('tags/edit',{tag:tag});
  });
});


// EDIT a tag by ID
router.put('/:id', function(req,res){
    db.tag.update({
      name: req.body.name
    },{
      where: {id:req.params.id}
    });
});

// DELETE a tag by ID
router.delete('/:id', function(req,res){
  db.tag.findOne({
    where: {id:req.params.id},
    include: [db.post]
  }).then(function(tag){
    // loop through and remove relationships first
    // async.forEach(tag.posts, function(p, callback){}, function(){});
    async.forEach(tag.posts, function(p, callback){
      // this is the loop to delete the tag from the posts
      // model1.addModel2(instance of model2) OR
      // model1.removeModel2(instance of model2)
      // remove the relationship tag / posts
      tag.removePost(p);
      callback();
    }, function(){
      // function that executes when all callback have returned
      // to destory the tag in tab db
      db.tag.destroy({
        where: {id:req.params.id}
      }).then(function(deletedTag){
        res.send('All good');
      });
    }); // End of async
  }); // end of promise
}); // end of router.delete

// when someone needs me give them this var (router)
module.exports = router;
