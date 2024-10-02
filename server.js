const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json(
        {
            message:'hi'
        }
    )
})

app.get('/download', (req, res) => {
    res.download('server.js');
})

const userRouter = require('./routes/users');

app.use('/users', userRouter);

app.post('/api/items/:id/:action', (req, res) => {
    const id = req.params.id;
    const action = req.params.action;
    const data = req.body;
    res.json({ message: 'Request processed', id, action, data });
});


app.listen(3000, ()=>console.log('Server listening on 3000.'));