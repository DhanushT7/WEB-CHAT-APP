import bcrypt from "bcrypt"

const decrypt = async (enteredPassword, storedPassword)=>{
 try{
  const result = await bcrypt.compare(enteredPassword, storedPassword);
  return result;
 }catch(error){
  throw error;
 }
}

export default decrypt;