
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
    // do somethign with tthe data
    res.send('data received');
})

router.get('/:id/:action', (req, res) => {
    const id = req.params.id;
    const action = req.params.action;
    // res.send('id', id, 'action', action);
    res.send(`id: ${id}, action: ${action}`);
})

module.exports = router;