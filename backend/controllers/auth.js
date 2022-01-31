require("dotenv").config();

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('236374376846-rjs664fki0dsr13hk6hlkv7o80hn0osk.apps.googleusercontent.com');
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (req.headers.type === 'jwt') {
  
      const token = authHeader && authHeader.split(" ")[1];
  
      if (!token) return res.status(401).send();
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send();
        req.verifiedUser = user;
        next();
      });
    }else if(req.headers.type==='google'){
  
      let token = authHeader && authHeader.split(" ")[1];
      try{
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: '236374376846-rjs664fki0dsr13hk6hlkv7o80hn0osk.apps.googleusercontent.com'
        });
        req.verifiedUser = {username:ticket.payload.name};
        next();
  
      }catch(err){
        return res.status(403).send();
      }
  
    }
  };

  module.exports = {
    verifyToken
}