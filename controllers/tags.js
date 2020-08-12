let express = require('express')
let db = require('../models')
let router = express.Router()

// GET / - display all tags and their post count
router.get('/', (req, res) => {
  db.tag.findAll({
    include: [db.article]
  }).then((tags) => {
    res.render('tags/index', { tags: tags })
  }).catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

// GET /tags/:id - display a specific tag and its articles
router.get('/:id', (req, res) => {
  db.tag.findOne({
    where: { id: req.params.id },
    include: [db.article]
  })
    .then((tag) => {
      console.log(tag.articles)
      if (!tag) throw Error()
      res.render('tags/show', { tag: tag })
    })
    .catch((error) => {
      console.log(error)
      res.status(400).render('main/404')
    })
})

module.exports = router
