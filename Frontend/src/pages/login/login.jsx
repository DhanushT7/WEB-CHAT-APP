import './login.css';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useToast } from '@chakra-ui/react'


function Login(){

  const statuses = ['success', 'error', 'warning', 'info']
  const toast = useToast();
  const navigate = useNavigate();

  const [captcha, setCaptcha]=useState("");
  const [gcaptcha, setgCaptcha]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogIn(){
    if(captcha===gcaptcha){

      const res = await fetch("http://localhost:5001/api/auth/login", {
        method : "POST",
        headers : {'Content-Type':'application/json'},
        body : JSON.stringify({email:email, password:password}),
      });

      const data = await res.json();
      if(data.message == "success"){
        toast({
                title: `account logged in!`,
                status: "success",
                duration: 2000,
                isClosable: true,
              })

        setTimeout(()=>{
          navigate('/home');
        }, 1500);

        return;
      }else{
        toast({
                title: `${data.message}`,
                status: "warning",
                isClosable: true,
              })
        return;
      }

    }else{

    //  alert('wrong captcha');
      toast({
                title: `wrong captcha`,
                status: "error",
                isClosable: true,
              })
      generateCaptcha();

    }
  }

  useEffect(() => {
    generateCaptcha();
  }, []);

  function generateCaptcha(length = 6) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let capt=""
    for (let i = 0; i < length; i++) {
        capt += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setgCaptcha(capt)
    return capt;
  }

  function handleEmailChange(event){
    setEmail(event.target.value);
  }

  function handlePasswordChange(event){
    setPassword(event.target.value);
  }

  function handleCaptchaChange(event){
    setCaptcha(event.target.value);
  }

  function handleForgot() {
    const email = prompt("Please enter your email address:");
    if (email) {
      checkEmailExists(email);
    }
  }
  
  async function checkEmailExists(email) {
    try {
      const res = await fetch('http://localhost:5001/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
  
      const data = await res.json();
      if (data.exists) {
        // Email exists, proceed to forgot password OTP page
        navigate('/forgotPass', { state: { email } });
      } else {
        // Email does not exist, prompt user to sign up
        if (confirm("Email not found. Would you like to sign up?")) {
          navigate('/signup');
        }
      }
    } catch (err) {
      console.error("Failed to check email:", err);
    }
  }

  function handleSignUp(){
    console.log("working...");
    navigate('/signup');
  }

  return(
    <div className="page">
       
      <div className="login-box">

        <div className="heading">Log In</div>

        <div className="credentials-input-box">

          <div className="username-input-box">
            <label  className="username-label" htmlFor="username">Username</label>
            <input className="username" id="username" type="text" placeholder="username" onChange={handleEmailChange}></input>
          </div>

          <div className="password-input-box">
            <label className="password-label" htmlFor="password">Password</label>
            <input className="pin" id="password" type="password" placeholder="password" onChange={handlePasswordChange}></input>
          </div>

          <div className="captcha-input-box">
            <label className="captcha-label" htmlFor="captcha-input">Captcha</label>

             <div className="captcha">
                <div className="captcha-display">{gcaptcha}</div>
                <input className="captcha-input" id="captcha-input" type="text" placeholder="captcha" onChange={handleCaptchaChange}></input>
              </div>
                
          </div>

        </div>

        <div className="forgot-password"><a onClick={handleForgot}>Forgot Password?</a></div>

        <div className="log-in">
          <button onClick={handleLogIn}  className="login-button" >log in</button>
          <p>Don&apos;t have an account? <span className="signup" ><a onClick={handleSignUp}>Sign Up</a></span></p>
        </div>

       </div>

    </div>
  );
}
export default Login;
