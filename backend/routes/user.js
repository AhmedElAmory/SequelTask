const express = require('express')
const router = express.Router()

const  { 
    register,
    login,
    googleRegisterLogin,
    profile,
    editbio,
    uploadpicture
} = require('../controllers/user.js')

const  { 
    verifyToken
} = require('../controllers/auth.js')

router.post("/register", register);
  
router.post("/login", login);

router.post("/googleRegisterLogin", googleRegisterLogin);

router.get("/profile",verifyToken, profile);

router.post("/editbio",verifyToken, editbio);

router.post("/uploadpicture",verifyToken, uploadpicture);

module.exports = router;