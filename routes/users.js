
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('users list');
})
router.get('/new', (req, res) => {
    res.send('new users form');
})

router.post('/', (req, res) => {
    let data = req.body;
    console.log(data);
    res.send(data);
})

router.get('/:id', (req, res) => {
    console.log(`the user is ${req.user}`);
    res.send(`data received is id = ${req.params.id}`);
})
const users = ['bob', 'tom', 'bill'];
router.param('id', (req, res, next, id) => {
    console.log(id);
    req.user = users[id-1];
    next();
})

router.get('/birds/fly', (req,res) => {
    res.send('birds are flying');
});



module.exports = router;