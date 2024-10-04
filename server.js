require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const db_uri = 'mongodb+srv://yash2:yash2@cluster0.pm2xabx.mongodb.net/test4?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(db_uri);

const db = mongoose.connection;
db.once('open', () => console.log('Database Connected.'));
db.on('error', (err) => console.log('Error connecting to db', err));

app.use(express.json());

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);


app.listen(3000, () => {
    console.log('server is running on 3000');
})

/*
1. implement a mongodb schema and model
2. implement the routes
3not
. implement a login functionality
*/