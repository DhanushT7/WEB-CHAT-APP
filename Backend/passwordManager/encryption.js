import bcrypt from "bcrypt"
const salting = 10;

const ecncrypt = async (newPass)=>{
 
  try{
    const hashed  = await bcrypt.hash(newPass, salting);
    return hashed
  }catch(error){
    throw error;
  }
}

export default ecncrypt;