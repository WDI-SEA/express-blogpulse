let express = require('express')
let db = require('../models')
let router = express.Router()

router.post('/', (req, res) => {
    try {
        db.comment.create({
            name: req.body.name,
            content: req.body.content
        })
        
    } catch(err) {
        console.log(error)
        res.status(400).render('main/404')
    }  
})
  

module.exports = router