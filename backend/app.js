require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");

const User = require("./models/users");
const jwt = require("jsonwebtoken");

const MongoURI=process.env.MONGO_URI;

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


const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send();
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send();
    req.verifiedUser = user;
    console.log(user)
    next();
  });
};


app.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    console.log(hash);
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      bio:"Try to Edit your Bio!",
    })
    res.send("user Added");
  } catch (error) {
    console.log(error);
  }
});

app.post("/checkemail", async (req, res) => {
  if (req.body.email != undefined) {
    let user = await User.findOne({ email: req.body.email });
    if (user != null) {
      res.send(true);
    }else{
      res.send(false);
    }
  }
});

app.post("/checkusername", async (req, res) => {
  if (req.body.username != undefined) {
    let user = await User.findOne({ username: req.body.username });
    if (user != null) {
      res.send(true);
    }else{
      res.send(false);
    }
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  User.findOne({ username },async (err,user)=>{
    if(user == null){
      res.send("wrong username");
      return;
    }else{
      let result = await bcrypt.compare(password, user.password);
      if(!result){
        res.send("wrong password");
        return;
      }else{
        const accessToken = jwt.sign({username:user.username},process.env.ACCESS_TOKEN_SECRET);
        res.send({
          token:accessToken,
          username:user.username
        });
        console.log("Successful Login");
      }
    }
  });
});

app.get("/profile", verifyToken , async (req, res) => {
  
  User.findOne({ username:req.verifiedUser.username },async (err,user)=>{
      res.send(user);
  });
});



// Starting server
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

