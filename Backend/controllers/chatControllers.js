import asyncHandler from "express-async-handler"
import chat from "../Models/chatModel.js"
import user from "../Models/userModel.js"
import { update } from "./authControllers.js";

export const accessChat = asyncHandler(async (req, res)=>{
  
  const {userId} = req.body;
  if(!userId){
    console.log("requesting chat without receiver id")
    return res.status(400);
  }

  var isChat = await chat.find({
    isGroupChat : false,
    $and : [
      {users : {$elemMatch : {$eq : req.user._id}}},
      {users : {$elemMatch : {$eq : userId}}},
    ],
  }).populate('users', '-password')
    .populate('latestMessage');

    isChat = await user.populate(isChat, {
      path : "latestMessage.sender",
      select : "name email picture",
    })

    if(isChat.length > 0){
      return res.status(200).send(isChat[0])
    }else{

      var newChat = {
        chatName : "sender",
        isGroupChat : false,
        users : [req.user._id, userId], 
      };

      try{

        const createdChat = await chat.create(newChat);
        const fullCreatedChat = await chat.findOne({_id : createdChat._id}).populate('users', '-password');
        res.status(200).send(fullCreatedChat);

      }catch(error){
        res.status(400);
        throw new Error(error.message);
      }
    }

});


export const fetchChat = asyncHandler(async (req, res)=>{
  
  try{

    let fetchedChat = await chat.find({
    users : {$elemMatch : {$eq : req.user._id}}
  })
  .populate("users", "-password")
  .populate("groupAdmin", "-password")
  .populate("latestMessage")

  fetchedChat = await user.populate(fetchedChat, {
    path : "latestMessage.sender",
    select : "name email picture",
  })
  res.status(200).send(fetchedChat);
  }catch(error){
    throw new Error(error.message);
  }

});

export const createGroup = asyncHandler(async (req, res)=>{

  const { groupName, groupMembers } = req.body;

  if(!groupName || !groupMembers){
    return req.status(400).send("please fill all the fields!");
  }

  if(groupMembers.length < 2){
    return req.status(400).send("more than 2 users required for group chat");
  }
  groupMembers.push(req.user._id);

  const newChat = {
    chatName : groupName,
    isGroupChat : true,
    users : groupMembers,
    groupAdmin : req.user._id,
  }
  
  try{
     const created = await chat.create(newChat)
     .populate("users", "-password")
     .populate("groupAdmin", "-password");
     res.status(200).send(created);
  }catch(error){
    throw new Error(error.message);
  }

});

export const renameGroup = asyncHandler(async (req, res)=>{

  const {groupId, newName} = req.body;

  if(!groupId || !newName){
    res.status(400).send("please fill all the fields!");
  }

  try{
      const updated = await chat.findOneAndUpdate(
        {_id : groupId}, 
        {$set : {chatName : newName}}, 
        {new : true}
      )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
      res.status(200).send(updated);
  }catch(error){
    throw new Error(error.message);
  }

});

export const addToGroup = asyncHandler(async (req, res)=>{
  
  const {groupId, userId} = req.body;

  try{

    const group = await chat.findById(groupId);
    if(req.user._id.toString() != group.groupAdmin._id.toString()){
      return res.status(401).send({message : "only admins can add a person!"});
    }else{

      if(group.users.includes(userId)){
        return res.status(400).send({message : "user already exists in the group!"})
      }

      const updated = await chat.findByIdAndUpdate(
        groupId,
        {$push : {users : userId}},
        {new : true}
      )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
      
      return res.status(200).send(updated);
    }
  }catch(error){
    throw new Error(error.message);
  }

});

export const removeFromGroup = asyncHandler(async (req, res)=>{

  const {groupId, userId} = req.body;

  if(!groupId || !userId){
    return res.status(400).response({message : "groupId and UserId is required!"})
  }

  try{
      const group = await chat.findById(groupId);

      if(req.user._id.toString() != group.groupAdmin._id.toString()){
        return res.status(401).send({message : "only admins can remove a person!"});
      }else{
        
        if(!group.users.includes(userId)){
          return res.status(400).send("user is not in the group!");
        }

        const updated = await chat.findByIdAndUpdate(
          groupId,
          {$pull : {users : userId}},
          {new : true}
        )
        .populate("users", "-password")
        .populate("groupAdmin", "-password"); 

        return res.status(200).send(updated);
      }
  }catch(error){
    throw new Error(error.message);
  }
      
}); 