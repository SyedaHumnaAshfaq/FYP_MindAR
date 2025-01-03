const bcrypt = require('bcrypt');
// const argon2 = require('argon2');
const User = require('../mongo_models/UserSchema');

const register = async (req, res) => {
  const { username, email, password,role } = req.body;
  
  try {
    const existingUser  = await User.findOne({ email });
    if (existingUser) {
        console.log("User already exists");
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password,10);
    // const newUser = new User({ username, email, password: hashedPassword });
    
    const newUser = new User({ username, email, password:hashedPassword ,role: role || 'customer' });
    await newUser.save();
    console.log('User registered successfully');
    return res.status(201).json({ message: 'User registered successfully' });
    
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Error registering user' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find the user by username
    const user = await User.findOne({ username });
    
    // If the user is found, compare the passwords
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      // const isPasswordMatch = password === user.password;
      req.session.user = { id: user._id, username: user.username, role: user.role };
      // If the password matches, log in the user
      if (isPasswordMatch) {
        console.log("Login Successful");
        console.log(req.session.user);
        if(user.role === 'admin') {
          // If the user is an admin, redirect to the admin page
          return res.redirect('/adminHomePage');
        } else {
          // If the user is not an admin, redirect to the user page
          return res.redirect('/');
        }
        // return res.status(200).json({ message: 'Login Successful' });
      } else {
        console.log('Invalid Credentials');
        return res.status(401).json({ message: 'Invalid Credentials' });
      }
    } else {
      console.log('Invalid Credentials');
      return res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { register,login};