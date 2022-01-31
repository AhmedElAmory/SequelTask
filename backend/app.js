require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const MongoURI = process.env.MONGO_URI;

//routes
const register_routes = require('./routes/register.js')
const user_routes = require('./routes/user.js')

//App variables
const app = express();
var cors = require("cors");
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors({ origin: "*" }));
const port = "8000";


const sessionConfig = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));

// Mongo DB
mongoose
  .connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB is now connected"))
  .catch((err) => console.log(err));

app.use('/',register_routes);
app.use('/',user_routes);

// Starting server
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

