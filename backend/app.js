const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");

const User = require("./models/users");

const MongoURI="mongodb+srv://sequel:sequel@cluster0.u3whp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//App variables
const app = express();
var cors = require("cors");
app.use(express.json());
app.use(cors({ origin: "*" }));
const port = "8000";
const saltRounds = 10;

// Mongo DB
mongoose
  .connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB is now connected"))
  .catch((err) => console.log(err));

app.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    console.log(hash);
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash  
    })
    res.send("user Added");
  } catch (error) {
    console.log(error);
  }
});



// Starting server
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

