import mongoose from "mongoose"

const userSchema = mongoose.Schema(
  {

    name:{
      type:String,
      required:false,
      default:"",
    },

    email:{
      type:String,
      required:true,
      unique:true,
    },

    password:{
      type:String,
      required:true,
    },

    picture:{
      type:String,
      required:true,
      default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    }
  },
  {
    timestamps:true,
  }
);

const user = mongoose.model("User", userSchema);
export default user;