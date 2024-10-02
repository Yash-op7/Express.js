- npm init -y
- npm i --save-dev nodemon

- app = express();
- app.get/post/put/delete/patch(path, callback); callback with threee args req, res, next


- res.status(500).send('hi');
- res.status(200).json({message:"Error"});

- res.download()('server.js');

- most of the time you either send json or render a file in express:

- res.render(file_path)
- res.render('index');
by default all of your view files are going to be searched for in a folder called views

- express Router:
```js
// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('users list');
})
router.get('/new', (req, res) => {
    res.send('new users form');
})

module.exports = router;        // default export
// and inside index.js

const userRouter = require('./routes/users');
app.use('/users', userRouter);
``` 

- post request
- dynamic request params:
```js
router.get('/:id/:action', (req, res) => {
    const id = req.params.id;
    const action = req.params.action;
    // res.send('id', id, 'action', action);  // dont send this obviously wrong
    res.send(`id: ${id}, action: ${action}`);
})
```

- these are dynamic routes, you should put static routes above dynamic ones, as the routes are matched with urls top to bottom in the server.js file

- combining multiple routes:
