import {useNavigate} from 'react-router-dom'
import './website.css'
import arrow from './components/arrow.jpeg'

function Mainpage(){
  const navigate = useNavigate();

  function goToApp(){
    
    const hadAccount = false;
    if(!hadAccount){
      navigate("/signup");
    }else{
      navigate("/login");
    }
  
  }

  return(
    <div className="main-page-body">
      <div className="part1">
        
        <div className="title-box">
          <p className="title">Gibberish</p>
          <p className="title-msg1">Space to chat</p>
          <button className="title-try" onClick={goToApp}>Try Now<img src={arrow} alt="arrow"></img></button>
        </div>

      </div>
    </div>
  );
}

export default Mainpage;