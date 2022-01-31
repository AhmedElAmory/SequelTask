const express = require('express')
const router = express.Router()

const  { 
    checkemail,
    checkusername,
} = require('../controllers/register.js')

router.post("/checkemail", checkemail);
  
router.post("/checkusername", checkusername);

module.exports = router;