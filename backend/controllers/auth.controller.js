import User from "../models/user.js";
import bcrypt from "bcrypt";
import { genToken } from "../config/jwt.js";



// Signup

export const SignUp = async (req,res) => {
    try {
        const {name, email, password, role } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({ message: "All fields are required"});
        }

        if(password.length < 6){
          return res.status(400).json({ message: "Password must be at least 6 characters long"});
        }

        const userExists = await User.findOne({email});

        if( userExists) {
            return res.status(400).json({ message: "User already exixsts"});

        }
        const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });

        
        
    } catch (error) {
        res.status(500).json({ message: "signup error" });
        
    }
}

// Login

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
    
  } catch (error) {
    res.status(500).json({ message: "Logout error" });
    
  }
}


