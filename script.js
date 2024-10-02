const mongoose = require('mongoose')
const User = require('./User');

const url = 'mongodb+srv://yash2:yash2@cluster0.pm2xabx.mongodb.net/test4?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(url).then(()=>console.log('connected'));


async function run() {
    const user = new User({name:'jack', age:20});
    // or 
    // const user = await User.create({name:'tim', age:21});
    await user.save();
    console.log(`user is saved.`);
}

async function findUser() {
    try{
        const user = await User.deleteOne({name:'ja'});
        console.log('users are', user);
    } catch(e) {
        console.log(e.message);
    }
}

findUser();
// run()
