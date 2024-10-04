$ mongosh
- show dbs
- use myDB
- show collections
- db.dropDatabase()
- cls

> you don't need to create any database or table before using it, it will automatically be created if it doesn't exist at runtime of the command

# inserting a document
- use myDB
- db: prints the current db
- db.users.intertOne(): allows us to insert one document inside users collection inside the current db, arg is a JS object, ex:
db.users.insertOne({name: "Kyle"})

- db.users.find(): lists/finds/selects all documents
- db.users.insertOne({name:"Sally", age:39, address:{street: "97 North st."}, hobbies:["Running"]})

- db.users.insertMany([{name:"a"}, {name:"b"}])

# query/read documents
- db.users.find() - gets all documents, but we can attach additional functinos to this to get different types of outputs:
    - we can sort them
        - ex: db.users.find().sort({name: 1})
        - sort() takes an object where each key value resembles a key to sort by, value 1 for ascending, -1 for desc
        - this allows us to easily sort by multiple fields at once
        db.users.find().sort({age:1, name:-1});
    - we can limit or skip them
        - ex db.users.find().skip(3).limit(2)
- how to query on different fields, essentially `WHERE` queries in SQL, to do that we just pass a parameter to our find method
    - db.users.find({ name:"Kyle" })
    - db.users.find({ age:26 })
- how to get specific parameters like the `SELECT` clause in SQL, do this using the 2nd parameter in `find(condition_object, projection_object)`:
    ex: db.users.find({ name:"Kyle" }, { name:1, age:1 }), the fields not mentioned are defaulted to 0, except `_id` which is returned by default to override this behavior set it to 0 in the `project_object`.
    - to get all the fields except age: db.users.find({ name:"kyle" }, { age:0 });

# complex queries
- db.users.find({ name: { $eq: "Sally" }})
- similar ones are $ne, $gt, $ngt, $lt, $nlt, $gte, $lte
- db.users.find({ age: { $gte:20 }});
- $in -> db.users.find({ name: { $in: ["Kyle", "Sally"] }});
- similarly: $nin
- $exists: db.users.find({ age: { $exists: false }}) // to find all the documents where age key doesn't exits.
- db.users.find({ age: { $gte: 20, $lte: 40 }, name: "Sally" }) -> how this is executed is that its basically converted to sequential `AND` statement within each {}, so here, it first checks ƒor documents where age is gte 20 `AND` lte 40 then on these documents it takes an `AND` with name === "Sally"
- another way to do this is to use $and and explicitly specify the conditions in an array: `db.users.find({ $and: [{age: 20}, {name: "Kyle"}] })`
- this $and is not that useful since you can just do this inside the find, but you do need $or:
`db.users.find({ $or: [{age: { $lte: 20 }}, {name: "Kyle"}] })`
- $not: `db.users.find({ age: { not: { $lte:20 }}})`, special note is that $not also fetches objects where the specific key contains `null`
- To inter-compare, that is compare between values within each object:
`db.users.find({ $expr: { $gt: ["$debt", "$balance"] }}), debt and balance are keys, this returns all objects where the debt > balance
- To query on the subobject's keys: db.users.find({ "address.street": "123 Main St" });
- you can also use `findOne()`
- db.users.countDocuments({ age: { $lte: 40 }});
- db.users.findOne({ _id: ObjectId("342139dufhsd9...")}) // find by id

# update queries
- db.users.update() all the things that you passed to .find() work with update as well to select the documents to update
- db.users.updateOne({age: 26}, { $set: { age: 27 }}); 
- db.users.updateOne({ _id: ObjectId("342139dufhsd9...")}, { $set: {name: "New Name" }}) // update by id
- db.users.updateOne({ _id: ObjectId("342139dufhsd9...")}, { $inc: {age: 3 }}) // increment
- db.users.updateOne({ _id: ObjectId("342139dufhsd9...")}, { $rename: {name: "firstName" }}) // rename
- db.users.updateOne({ _id: ObjectId("342139dufhsd9...")}, { $unset: {name: "" }}) // unset
- db.users.updateOne({ _id: ObjectId("342139dufhsd9...")}, { $push: {hobbies: "Swimming" }}) // push to array values
- db.users.updateOne({ _id: ObjectId("342139dufhsd9...")}, { $pull: {hobbies: "Bowling" }}) // pull/remove/delete value from array values
- you can remove values from array objects based on conditions by passing similar to find() conditions
- db.users.updateMany({ address: { $exists: true }}, { $unset: { address: "" }})
- db.users.replaceOne({ age:30 }, new_obj), example: db.users.replaceOne({ age:30 }, { name: "John" })

# delete
