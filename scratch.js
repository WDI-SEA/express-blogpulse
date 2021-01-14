const db = require('./models')

db.comment.create({
    name: 'asdfkl',
    content: 'hope this works2',
    articleId: 1,
}).then((commentDB) => {
    console.log(`${commentDB.name} has comment of ${commentDB.content}`)
    }).catch(err => console.log(err));
