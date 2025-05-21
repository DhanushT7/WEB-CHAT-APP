import asyncHandler from "express-async-handler"
import user from "../Models/userModel.js"
import chat from "../Models/chatModel.js"

export const createGroupChat = asyncHandler(async (req, res)=>{

  if(!req.body.users || !req.body.name){
    return res.status(400).send({message:"please fill all the fields"});
  }

  var users = JSON.parse(req.body.users);

  if(user.length < 2){
    return res.status(400).send({message:"group chat requires atleast three members"});
  }

  users.push(req.user);

  try{
    const groutChat = await chat.create({
      chatName : req.body.name,
      isGroupChat : true,
      users: users, 
      groupAdmin : req.body.user,
    });

    const fullGroupChat = await chat.findOne({_id : groutChat._id})
    .populate("users", "-password")
    .populate("groupAdmin", "-passowrd");

    console.log("group created");
    res.status(200).json(fullGroupChat);
  }catch(error){
    console.log(error.message);
    res.status(400).json({message:"error in group creation"});
  }

})

export const renameGroup = asyncHandler(async (req, res)=>{
  if(!req.body.chatId || !req.body.newName){
    res.status(400).json({message : "please fill all the fields"});
  }

  const newName = req.body.newName;
  const chatId = req.body.chatId;

  try{

    const updatedMsg = await chat.findByIdAndUpdate(chatId, {chatName : newName}, {new : true})
    .populate("users", "-password")
    .populate("groupAdmin", "-passowrd");

    if(!updatedMsg){
      return res.status(404).json({message : "chat not found"});
    }

    return res.status(200).json(updatedMsg);
  }catch(error){
    console.log(error.message);
    return res.status(404).json({message : "error in upating group name!"});
  }

})    