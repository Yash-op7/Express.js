const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.json(
        {
            message:'hi'
        }
    )
})

const userRouter = require('./routes/users');

app.use('/users', userRouter);

app.listen(3000, ()=>console.log('Server listening on 3000.'));