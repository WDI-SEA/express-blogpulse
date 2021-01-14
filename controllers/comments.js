let express = require('express');
let db = require('../models');
let router = express.Router();

// GET /comments - display all comments
// router.get('/articles/:id', (req, res) => {
//     console.log('okay upto here, getting info');
// }).then(
//     db.comment.create({
//         name: 'asdfkl',
//         content: 'hope this works2',
//         articleId: 1,
//     }).then((commentDB) => {
//         console.log(`${commentDB.name} has comment of ${commentDB.content}`)
//         }).catch(err => console.log(err));
// );