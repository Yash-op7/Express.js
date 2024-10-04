require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./User");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to db."));

async function deleteMethods() {
  // deletes the first match
  await User.deleteOne({ name: "bob" });

  // self explanatory
  await User.deleteMany({ age: 20 });
}

async function findAllUsers() {
  //  find all
  const users = await User.find();
  console.log("All the users are\n", users);

  // find all where name is kyle, exact match
  // const users = await User.find({name:'Kyle'});
  // const firstUserThatMatches = await User.findOne({name:'Kyle'});

  // User.exists({name:'Kyle'});
}

async function findById() {
  const user = await User.findById("66fd36bff5c88017769fa6c7");
  console.log(user);
}

async function createUser() {
  const user = new User({ name: "kyle", age: 40 });
  await user.save();
  // or
  // const user = await User.create({name:'john', age:20});
  console.log("created user.");
}

async function queries() {
  // nice Queries
  //   const user = await User.where("name").equals("kyle");
  //   const user = await User.where("age").gt(20);
  //   const user = await User.where("age").gte(20);
  //   const user = await User.where("age").lt(20);
  //   const user = await User.where("age").lte(20);

  // we can also chain these
  //   const user = await User.where("age").gte(25).where('name').equals('kyle');
    // const user = await User.where("age").gte(25).lte(50).where('name').equals('kyle');
    
    // select, limit, skip
    // const user = await User.where("age").gte(19).lte(50).skip(4).limit(2).select('age');

    // where() can also take same args as find()
    // const user = await User.where({ name: /^.{4}$/i });
    // const user = await User.where({ name: new RegExp('^.{4}$', 'i') });

    // const users = await User.find().select('name age'); // Only return name and age fields



//   console.log("query result is", user);
}

try {
  //   deleteMethods();
  //   findAllUsers();
  //   findById();
  //   createUser();
  queries();
} catch (e) {
  console.log(e.message);
}
