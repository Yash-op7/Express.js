- in express dont forget, app.use(express.json()); &
app.use(express.urlencoded({ extended: true })); & 
require('dotenv').config();

### how to submit a form in react:
```jsx
import { useState } from "react";
import axios from "axios";

export default function UserLogin() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  async function handleSubmit(e) {      // ⭐️
    e.preventDefault()              // ⭐️
    console.log('attemptign to submit the fomr.')
    try {
      const response = await axios.post(        // ⭐️
        "http://localhost:5000/auth/login",
        formData
      );
      console.log("successfully saved user", response);
    } catch (err) {
      console.log(err);
    }
    setFormData({
      name: "",
      password: "",
    });
  }
  function formInputHandler(e) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,        // ⭐️
      };
    });
  }

  return (
    <div>
      form
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="name">name</label>
        <input
          name="name"
          id="name"
          value={formData.name}
          onChange={formInputHandler}
          type="text"
        ></input>

        <label htmlFor="pwd">password</label>       // ⭐️
        <input
          id="pwd"
          required          // ⭐️
          name="password"
          value={formData.password}
          onChange={(e) => formInputHandler(e)}
          type="password"
        ></input>
        <input type="submit" />
      </form>
    </div>
  );
}

```


# mistakes
- in react form handling:
    - forgot `e.preventDefault()` in the onSubmit handler where e is the onSubmit event in the form element, for this also forgot to pass the event to onSubmitHandler function
    - use `HtmlFor` inside label instead of `for` to correspond to the input with input tag's `id` attr
    - use this: `[e.target.name]: e.target.value,        // ⭐️`
- in express bcrypt,
    - await bcrypt.compare(incomingPassword, storedHashedPassword);
    - you keep forgetting await, it is very important
    - in axios err is handled like this:
    ```js
    async function handleSubmit(e) {
    e.preventDefault()
    console.log('attemptign to submit the fomr.')
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        formData
      );
      console.log("successfully saved user", response);
    } catch (err) {
    //   console.log('printing error:💥',err.flx);      // wrong way to access the error message sent by the server
    console.log('printing error:💥', err.response ? err.response.data : err.message);
    }
    setFormData({
      name: "",
      password: "",
    });
  }
  ```

- use return when doing any res.send(), basically when you're done with the request.


- Bonus implement rate limiting on sensitive express routes very easily:
```js
// Define rate limiting rule: 5 requests per minute per IP
const rateLimiterMiddleware = rateLimit({
  windowMs: 2 * 1000, // 1 minute
  max: 1, // Limit each IP to 5 requests per `window` (1 minute)
  message: 'Too many login attempts. Please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


app.get('/ddosTest', rateLimiterMiddleware, (req, res) => {
    res.status(200).send('Request granted. ⚜️ 🎉');
})
```