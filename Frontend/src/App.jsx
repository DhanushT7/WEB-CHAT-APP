import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Mainpage from "./pages/main/website.jsx";
import Home from './pages/home/Home.jsx'
import Contact from './pages/contact/contact.jsx'
import Login from './pages/login/login.jsx'
import Forgot from './pages/forgotPass/enterOTP.jsx'
import Reset from './pages/forgotPass/newPass.jsx'
import Signup from "./pages/signup/signup.jsx";
import VerifyEmail from './pages/signup/verifyEmail.jsx';


function App() {
  return(
      <Router>
        <Routes>
          <Route path="/" element={<Mainpage/>}/>
          <Route path="/home" element={ <Home/> } />
          <Route path="/login" element={ <Login/>} />
          <Route path="/forgotPass" element={ <Forgot/> } />
          <Route path="/newPass" element={ <Reset/> } />
          <Route path="/signup" element={ <Signup/> } />
          <Route path="/contact" element={ <Contact/> } />
          <Route path="/verifyEmail" element={ <VerifyEmail/> } />
        </Routes>
      </Router>
  );
}

export default App;