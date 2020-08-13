let express = require('express')
let db = require('../models')
let router = express.Router()

//post comment and the redirect to article comment page
router.post("/", (req, res) => {
    let data = req.body;
    db.comment.create(data)
    .then(() => {
        res.redirect(`/articles/${data.articleId}`);
    })
    .catch((error) => {
        res.status(400).render("main/404");
      });
  });


 // can also do the above this way
//   router.post("/", async (req, res) => {
//     try {
//       const newComment = await db.comment.create(req.body);
//       res.redirect(`/articles/${req.body.articleId}`);
//     } catch (err) {
//       console.log(err);
//       res.send("Error");
//     }
//   });

  
  module.exports = router;
