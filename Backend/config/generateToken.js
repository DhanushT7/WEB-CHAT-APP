import jwt from 'jsonwebtoken'

const generateToken = (userId)=>{
  return jwt.sign({id : userId}, process.env.JWT_SECREATE, {
    expiresIn : 30
  })
}
export default generateToken;