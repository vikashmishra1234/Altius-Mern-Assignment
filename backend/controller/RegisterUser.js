const User = require('../models/User'); // Import the User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register User Function
const RegisterUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password, // Password will be hashed automatically by Mongoose pre-save hook
      role,
    });

   
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id,name:newUser.name, email: newUser.email, role: newUser.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7h' } 
    );

    res.status(201).json({
      message: 'User registered successfully',
      success: true,
      token, // Send the JWT token in the response
      user: { name: newUser.name, email: newUser.email, role: newUser.role,user:newUser }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Server error. Please try again later.', success: false });
  }
};

module.exports = { RegisterUser };
