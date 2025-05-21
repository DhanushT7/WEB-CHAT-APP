import asyncHandler from "express-async-handler"
import encrypt from "../passwordManager/encryption.js"
import decrypt from "../passwordManager/decryption.js"
import sendEmail from "../mailManager/sendEmail.js"
import SignupEmail from "../mailManager/signupEmail.js"
import user from "../Models/userModel.js"

export const checkEmailExists = asyncHandler(async (req, res)=>{
  console.log("message from controllers");
  let {email, password} = req.body;
    try{
      //check email alreadt exists
  
      const result = await user.findOne({email:email});
      if(result){
        return res.status(401).json({message:"email already exists"});
      }else{
  
        return res.status(200).json({message:"email not exists"});
      }
  
    }catch(error){
      return res.status(500).json({message:"server issue!"});
    }
})

export const createAccount = asyncHandler(async (req, res)=>{
  const {email, password} = req.body;
  if(email && password){
    try{

      const hashedPassword = await encrypt(password);
      const result = await user.create({email : email, password : hashedPassword});
      return res.status(200).json({message:"success"});

    }catch(error){
      console.log(error.message);
      return res.send(500).json({message:"cant able to create Account"});
    }
  }else{
    return response.status(401).json({message:"Incorrect email or password"});
  }
})

export const login = asyncHandler(async (req, res)=>{
  let { email, password } = req.body;
  email = email.trim()
  password = password.trim()

  try {
      const result = await user.findOne({ email: email});
      if(!result){
        return res.status(401).json({ message: 'email not found!' });
      }

      const checkPassword = await decrypt(password, result.password);

      if (checkPassword) {
        res.status(200).json({message:"success"});
      } else {
          res.status(401).json({ message: 'Invalid email or password' });
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error'});
  }
})

export const checkEmail = asyncHandler(async (req, res)=>{
   const { email } = req.body;
  
    try {
      const result = await user.findOne({ email });
      if (result) {
        res.status(200).json({ exists: true });
      } else {
        res.status(200).json({ exists: false });
      }
    } catch (err) {
      console.error("Error checking email:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
})

export const verifyEmail = asyncHandler(async (req, res)=>{
  const otpCache = new Map();
  const {recepient_email, OTP} = req.body;
    console.log(recepient_email, OTP);
  
    if(!recepient_email || !OTP){
      return res.status(400).json({ message: "Missing E-mail or OTP..."});
    }
  
    const existingOtp = otpCache.get(recepient_email);
    if (existingOtp && Date.now() - existingOtp.timestamp < 60000) { // Check if OTP was sent in the last 1 minutes
      return res.status(200).json({ message: "OTP already sent." });
    }
  
    try{
      otpCache.set(recepient_email, { otp: OTP, timestamp: Date.now() });
      const result = await SignupEmail({recepient_email,OTP});
      res.status(200).json({message: result.message});
    }catch(err){
      res.status(500).json({message: err.message || "E-mail failed to be sent"});
    }
})

export const sendRecoveryEmail = asyncHandler(async (req, res)=>{
        const {recepient_email, OTP} = req.body;
        const otpCache = new Map();
        console.log(recepient_email, OTP);
  
        if(!recepient_email || !OTP){
          return res.status(400).json({ message: "Missing E-mail or OTP..."});
        }
  
        const existingOtp = otpCache.get(recepient_email);
        if (existingOtp && Date.now() - existingOtp.timestamp < 60000) { // Check if OTP was sent in the last 1 minutes
          return res.status(200).json({ message: "OTP already sent." });
        }
  
        try{
          otpCache.set(recepient_email, { otp: OTP, timestamp: Date.now() });
          const result = await sendEmail({recepient_email,OTP});
          res.status(200).json({message: result.message});
        }catch(err){
          res.status(500).json({message: err.message || "E-mail failed to be sent"});
        }
})

export const update = asyncHandler(async (req, res)=>{
  let {email, password} = req.body;

  if(!email || !password){
    res.status(404).json({ message: "Missing email or password" });
  }
  try{
    const hashedPassword = await encrypt(password);

    const result = await user.findOneAndUpdate(
      {email : email},
      {$set: {password : hashedPassword}},
      {new : true}
    );
    if (result) {
      res.status(200).json({ message: "Password updated successfully." });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }catch(error){
    console.error("Failed to update password:", error);
    res.status(500).json({message:"Failed to update password:"});
  }
  return;
})