const express = require('express');
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin.jsx")
const {loginUser, logoutUser, registerUser} = require('../controllers/authController.jsx');
router.get('/', (req, res) => {
    res.send("Hey, it's working!");
});

router.post('/register',registerUser);
router.post("/login",loginUser);
router.get("/logout", logoutUser)
module.exports = router;
