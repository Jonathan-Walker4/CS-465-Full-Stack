const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');  // Import jwt

const register = async (req, res) => {
  // Validate that all required fields are present
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ "message": "All fields required" });
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email
  });

  user.setPassword(req.body.password);  // Set user password

  try {
    const q = await user.save();
    if (!q) { // Database returned no data
      return res.status(400).json({ "message": "Error saving user" });
    } else { // Return new user token
      const token = user.generateJWT();
      return res.status(200).json({ token });
    }
  } catch (err) {
    return res.status(400).json({ "message": "Error saving user", err });
  }
};

const login = (req, res) => {
  // Validate that email and password are present
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ "message": "All fields required" });
  }
  
  // Delegate authentication to passport
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      // Error in Authentication Process
      return res.status(404).json(err);
    }
    if (user) { // Auth succeeded - generate JWT and return to caller
      const token = user.generateJWT();
      return res.status(200).json({ token });
    } else { // Auth failed return error
      return res.status(401).json(info);
    }
  })(req, res);
};

// JWT Authentication middleware
function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.sendStatus(401); // Unauthorized
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error("Token verification failed:", err);
            return res.sendStatus(401); // Unauthorized
        }

        req.user = user;
        next();
    });
}

module.exports = {
  register,
  login,
  authenticateJWT
};
