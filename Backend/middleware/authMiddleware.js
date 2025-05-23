import jwt, { decode } from 'jsonwebtoken'
import asyncHandler from "express-async-handler"
import user from "../Models/userModel.js"

export const protect = asyncHandler(async (req, res, next)=>{
  const authHeader = req.headers.authorization;
  let token = authHeader.split(" ")[1];
  token = token.trim();

  if(authHeader && authHeader.startsWith("Bearer")){
    try{

      const decoded = jwt.verify(token, process.env.JWT_SECRETE);
      req.user = await user.findById(decoded.id).select("-password");
      next();
    }catch(error){
      res.status(401);
      throw new Error('unauthorized!');
    }
  
  }else{
    throw new Error('invalid token!');
  }
})  

/*
import jwt from 'jsonwebtoken';
import asyncHandler from "express-async-handler";
import user from "../Models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1].trim();

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRETE);
      console.log(decoded.id);

      req.user = await user.findById(decoded.id).select("-password");
      if (!req.user) {
        throw new Error("User not found");
      }

      next();
    } catch (error) {
      console.error("JWT verify failed:", error.message);
      res.status(401);
      throw new Error("Unauthorized!");
    }
  } else {
    res.status(401);
    throw new Error("Invalid token!");
  }
});

*/

