import jwt from 'jsonwebtoken'

const generateToken = (userId)=>{
  console.log(userId);
  return jwt.sign({id : userId}, process.env.JWT_SECRETE, {
     expiresIn: "30d"
  })
}
export default generateToken;