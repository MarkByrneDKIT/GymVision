import "./login.css"
import { useRef } from "react"
import {loginCall} from "../../apiCalls"
import { useContext} from "react"
import { AuthContext } from "../../context/AuthContext";
import homeIcon2 from "../Images/homeIcon2.png";
import {Link} from 'react-router-dom';
import Footer from "../../components/Footer/Footer";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate} from 'react-router-dom';
import { useState } from "react";
 

 


export default function Login() {
    const username = useRef();
    const password = useRef();
    const onChange =() => {};
    const { user, isFetching, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const[errMsg, setErrMsg] = useState('');
  const[success, setSuccess] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);

    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
     const handleCaptchaChange = (value) => {
      setIsCaptchaVerified(true);
    }
    const togglePassword = () => {
      // When the handler is invoked
      // inverse the boolean state of passwordShown
      setPasswordShown(!passwordShown);
    };
    
   
    const handleClick = (e) => {
      e.preventDefault();
      loginCall( 
        { username: username.current.value, password: password.current.value },
        dispatch
        );
        try {
        } catch (error) {
          
        }
  
        };
        console.log(user);

        
        return (
        <div className="wrapper fadeInDown">
          <div id="formContent">
            {/* Tabs Titles */}
            <h2 className="active"> Sign In </h2>
            <h2 className="inactive underlineHover" ><a href="/register">Sign Up</a></h2>
    
  
    
            {/* Login Form */}
            <form onSubmit={handleClick}>
              <input type="text" id="login" className="fadeIn second" name="username" placeholder="Username" ref={username} required />
              <input type={passwordShown ? "text" : "password"  } id="login" className="fadeIn second" name="login" placeholder="Password" ref={password} required />
              
              <ReCAPTCHA id="CAPTCHA" sitekey="6LdlWlkkAAAAAF91dcFM2-0KlUx_dDmC5cEdfPqI" onChange={handleCaptchaChange}  required = {isCaptchaVerified} />
              <button onClick={togglePassword }>Show Password</button>
              <input type="submit" className="fadeIn fourth" value="Log In" />
               
            </form>
    
            {/* Remind  Password  */}
            <div id="formFooter">
              <a className="underlineHover" href="/recovery">Forgot Password?</a>
            </div>
            <Footer></Footer>
          </div>
        </div>
        
      );
    };
  