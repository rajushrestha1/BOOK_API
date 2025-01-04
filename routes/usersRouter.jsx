const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController.jsx');
const {loginUser} = require('../controllers/authController.jsx');
router.get('/', (req, res) => {
    res.send("Hey, it's working!");
});

router.post('/register',registerUser);
router.post("/login",loginUser);
module.exports = router;
