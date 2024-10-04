# express
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
```js
app.route('/birds').get((req, res) => {
res.send('get req');
}).post((res, req) => {
    res.send('post req');

}).delete((res, req) => {
    res.send('delete req');

})
```

The `app.param()` method in Express is a powerful way to handle route parameters. It allows you to define middleware that is executed whenever a specific parameter is present in the URL. This is useful for tasks such as validation, fetching data, or performing any necessary operations before handling the actual request.
```js

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
```

If you send a request to http://localhost:3000/users/2, the following happens:

The router.param('id', ...) middleware is triggered, logging 2 and setting req.user to 'tom'.
Control passes to the main route handler, which logs the user is tom and sends the response data received is id = 2.

## more on middleware
- code that runs between starting and ending of a request.
- every middleware takes res, req , next
- we define middleware like this:
```js
function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}
// and call it like so:

app.use(logger)
```
- as code runs from top to down the routes before app.use(middleware) wont use middleware, so
    - you can define global middleware at the very top
    - or you can attach middleware to individual routes like so:
    ```js
    app.get('/', logger, logger, middleware2, (req, res) => {...})
    ```
    - you can attach as many as you want

- query params:
    req.query.name for `/users?name=yash`

- parsing form data from forms and json:

# mongoose
- mongoose is the wrapper around mongo db
- npm i mongoose

## 3 concepts
- schema
    - defines the structure your data looks like, of an object
- model
    - is a schema in an actual usable form, so model is like an individual user object
- query
### schema
![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-3.png)
![alt text](image-4.png)
![immutablity](image-5.png)
![vvalidation of input fields](image-6.png)

- one issue with such validation checks is that they are only done in create() or save()

- const user = await User.create({name:'bob'});
- await user.save();
- user.name = 'bill';
- user.save();

### methods learnt so far:
see script2.js

- findByIdAndUpdate:
```js
app.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
```

### foreign keys
![alt text](image-7.png)
this ref tells mongoose what model this objectId refers to:
![alt text](image-8.png)
![populate()](image-9.png)

## advanced schema


# curl
`curl [options] [URL]`
```bash
curl -X POST http://localhost:3000/api/items/123/update
    -H "Content-Type: application/json"
     -d '{"key": "value"}'
```
> ## Breakdown of the cURL Command:
- -X POST: Specifies that this is a POST request.
http://localhost:3000/api/items/123/update: The URL where your API is hosted, including the route with parameters.
- -H "Content-Type: application/json": Sets the request header to indicate that you are sending JSON data.
- -d '{"key": "value"}': The actual data payload you're sending in JSON format.


# authentication
- see the auth code signup login


# jwt
- only for authorization
- this is making sure that hte user that has sent the request to your server is the same user which logged and was authenticated as a legitimate user.
- the way this is usually done is by sessions, for ex you have a session id that you send down in the cookies of the browser and then every time the client makes your request they send that session id up to the server and the server checks its memory and finds what user has that session id, it finds that user and then it does the authorization to make sure the uesr has access but in jwt instead of using cookeies it uses a json web token to do this authorization.
![alt text](image-10.png)

- in jwt when the user logs in successfully, the server instead of storing a session id, it serializes the user's information into a JWT and signs it with its secret key and doesn't stores anything in the server (because everythign about the client is encoded and serialized in the jwt, so when the client makes a request with its jwt the server can just process the request to check if its valid instead of storing anythgin in its memory which is less reliable) and returns it to the client, it signs it so that in the future it can detect if the client has tampered with the key
- on the client side when they log in successfully and receive a jwt they can store it however they like and use it to make future requests, mostly the client stores the jwt using cookie storage
- the main difference between jwt and session is that with session the id token is stored in that particular server's memory and the server has to perform a lookup, but in jwt the token is stored on the client side so it can use the same jwt on multiple servers
- ![alt text](image-11.png)

implementation
- to get a secret access token:
`require(crypto).randomBytes(64).toString('hex')`
- run this twice to get 2 tokens one for access and one for refresh

# 2 hour yt complete backend project

### - npm init -y
## npm i
> - express
> - bcrypt
> - cors
> - cookie-parser
> - helmet - for some sql injection prevention
> - joi - for user data validation
> - jwt
> - mongoose
> - nodemailer

## `package.json`
```json
"scripts": {
    "start": "node --env-file=.env index.js",
    "dev": "node --env-file=.env --watch --trace-warnings index.js"
}
```
- this removes the need for nodemon and dotenv

> npm run dev

## folder structure
- controllers
- middlewares
- models
- routers
- utils
- .gitignore

## index.js
```js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(cookieParser());
app.use(helmet());


mongoose.connect(process.env.Mongo_uri).then(() => console.log('connected.')).catch((err) => console.error('Error connecting to mongodb',err));
```

## models
### > userModel.js 
