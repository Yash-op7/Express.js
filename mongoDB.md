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

# complex query, 