const User = require("../models/users");

const checkemail = async (req, res) => {
    if (req.body.email != undefined) {
      let user = await User.findOne({ email: req.body.email });
      if (user != null) {
        res.send(true);
      } else {
        res.send(false);
      }
    }
  };
  
 const checkusername = async (req, res) => {
    if (req.body.username != undefined) {
      let user = await User.findOne({ username: req.body.username });
      if (user != null) {
        res.send(true);
      } else {
        res.send(false);
      }
    }
  };

  module.exports = {
    checkemail,
    checkusername,
}