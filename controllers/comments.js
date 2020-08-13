let express = require("express");
let db = require("../models");
let router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newComment = await db.comment.create(req.body);
    res.redirect(`/articles/${req.body.articleId}`);
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
});

module.exports = router;
