import User from "@/models/user.model";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import secrets from "@/config/secrets";

export const signUp = async (req, res) => {
    try {
          const { name, phone, email, password } = req.body;

          const hashedPassword = await bcrypt.hash(password, 10);
      
          if(!name || !phone || !email || !password){
              return res.status(400).json({message: 'please fill all the fields'})
          }
         const user = await User.create({
        name,
        phone,
        email,
        password:hashedPassword

      });
      user.save();
      res.status(201).json( 'succesfully registred' );
    } catch (error) {
      res.status(500).json(error);
    }
  };


  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
  
      res.status(200).json({ token, user, message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while logging in' });
    }
  };
  

export const logOut = async (req, res) => {
    res.cookie(secrets.token, null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: 'Logout User Successfully',
    });
  };


// Request Password Reset
export const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      res.status(200).json({token});
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while requesting a password reset' });
    }
  };
  
  export const resetPassword = async (req, res) => {
    try {
      const { token, newPassword } = req.body;
  
      const secretKey = 'your-secret-key'; // Replace with your secret key
      const decodedToken = jwt.verify(token, secretKey);
  
      const userId = decodedToken.userId;
  
      const user = await User.findById(userId);
      const hashedPassword = await bcrypt.hash(newPassword, 10);
  
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while resetting the password' });
    }
  };
    

  
  


