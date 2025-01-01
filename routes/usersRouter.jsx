const express = require('express');
const router = express.Router();
const userModel = require('../models/usermodel.jsx'); 
const bcrypt = require("bcrypt")
router.get('/', (req, res) => {
    res.send("Hey, it's working!");
});

router.post('/register', async (req, res) => {
    try {
        const { email, password, fullname } = req.body;
    
        bcrypt.genSalt(10, (err, salt) => {
               
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) return res.send(err.message);
                        else res.send(hash);
                    });
                });

        const user = await userModel.create({
            email,
            password,
            fullname,
        });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
});

module.exports = router;
