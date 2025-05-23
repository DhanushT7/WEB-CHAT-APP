import asyncHandler from "express-async-handler"
import user from "../Models/userModel.js"
import chat from "../Models/chatModel.js"
 
//find all users by keyword
export const allUsers = asyncHandler(async (req, res)=>{
  const {search} = req.query;
  const keyword = {
    $or :[
      {name : {$regex:search, $options:"i"}},
      {email : {$regex:search, $options:"i"}}
    ]
  } 
  const userList = await user.find(keyword).find({_id : {$ne : req.user._id}}); 

  res.send(userList);
})
