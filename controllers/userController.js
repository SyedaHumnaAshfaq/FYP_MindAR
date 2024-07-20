const bcrypt = require('bcrypt');
const User = require('../mongo_models/UserSchema');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const existingUser  = await User.findOne({ email });
        if (existingUser) {
          console.log("User already exists");
          return res.status(400).json({ message: 'User already exists' });
       
      }
      // if(password !== confirmpassword){
      //   return res.status(400).send('Passwords do not match');
      // }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      res.redirect('/');
      return res.status(201).json({ message: 'User registered successfully' });
      
    } catch (error) {
      console.error(error);
      res.redirect('/SignUp');
      return res.status(500).json({ message: 'Error registering user' });
    }
};
const login = async (req, res) => {
  const { username, password } = req.body;
  try{
    const user = await User.findOne({ username });
    // console.log("user found ", user);
    // console.log(bcrypt.compare(password, user.password));
    // const ispasswordMatch = await bcrypt.compare(password, user.password);
    // console.log(ispasswordMatch);
  if(user && bcrypt.compareSync(password, user.password)){
    // req.session.user = ({email: user.email});
    return res.status(200).json({ message: 'Login Successful' });
    } else {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }
  }catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal server error');
  }
};
module.exports = { register,login };