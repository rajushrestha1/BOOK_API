const userModel = require('../models/usermodel.jsx');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require('../utils/generateToken.jsx');

// Register User
module.exports.registerUser = async (req, res) => {
  try {
    const { email, password, fullname } = req.body;

    // Check if user already exists
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ error: "You already have an account, please login." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await userModel.create({
      email,
      password: hashedPassword,
      fullname,
    });

    // Generate token
    const token = generateToken(newUser);
    res.cookie("token", token, { httpOnly: true, secure: true });

    res.status(201).json({ message: "User created successfully", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login User
module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
      }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true, secure: true });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
