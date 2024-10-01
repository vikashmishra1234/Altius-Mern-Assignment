const User = require('../models/User');
const jwt = require('jsonwebtoken');

const RegisterUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    const newUser = new User({
      name,
      email,
      password,
      role,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '7h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      success: true,
      user: { name: newUser.name, email: newUser.email, role: newUser.role,token }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Please try again later.', success: false });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
   
    if (user.password!=password) {
      return res.status(400).json({ error: 'Password is not match' });
    }

    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7h' }
    );

    res.status(200).json({
      message: 'Login successful',
      success: true,
      user: { name: user.name, email: user.email, role: user.role ,token}
    });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Server error. Please try again later.', success: false });
  }
};

const getUser = async(req,res)=>{
  try {
    const userId = req.user.userId;
    const user = await User.findOne({_id:userId});
    if(!user){
      return res.status(404).json({
        error:"User Not Found"
      })
    }
    return res.status(200).json({
      user,
      success:true
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Server error. Please try again later.', success: false });
  }
}

module.exports = { RegisterUser, loginUser, getUser };
