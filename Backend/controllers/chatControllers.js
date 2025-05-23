import asyncHandler from "express-async-handler"
import chat from "../Models/chatModel.js"
import user from "../Models/userModel.js"

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

});

export const createGroup = asyncHandler(async (req, res)=>{

});

export const renameGroup = asyncHandler(async (req, res)=>{

});

export const addToGroup = asyncHandler(async (req, res)=>{

});

export const removeFromGroup = asyncHandler(async (req, res)=>{

}); 