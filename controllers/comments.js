let express = require('express');
const { sequelize } = require('../models');
let db = require('../models');
let router = express.Router();

// GET /comments - display all comments
// router.get('articles/:id', (req, res) => {
//     db.comment.findByPk({
//         where: {
//             articleId: req.params.id
//         },
//         order: sequelize.literal("createdAt DESC")
//     })
//     .then(foundComment => {
//         console.log(`${foundComment} is found at article page`)
//         res.render('articles/show', {foundComment});
//         console.log(`okay upto here, getting info found ${foundComment}`);
//     })

// })

router.post('/:id', (req, res) => {
    db.comment.create({
        name: req.body.name,
        content: req.body.content,
        articleId: req.params.id
    })
    .then((commentDB) => {
        console.log(`${commentDB.name} has comment of ${commentDB.content}`)
    })
    .catch(err => console.log(err))
});



module.exports = router
