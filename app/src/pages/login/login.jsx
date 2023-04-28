import "./login.css"
import { useRef } from "react"
import {loginCall} from "../../apiCalls"
import { useContext} from "react"
import { AuthContext } from "../../context/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate} from 'react-router-dom';
import { useState } from "react";
 
export default function Login() {
    const username = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const[errMsg, setErrMsg] = useState('');
  const[success, setSuccess] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    const [attempts, setAttempts] = useState(0);
 
 
    const togglePassword = () => {
      // When the handler is invoked
      // inverse the boolean state of passwordShown
      setPasswordShown(!passwordShown);
    };

    //Error message if user exceeds login attempts
        {errMsg && <p className="Error">{errMsg}</p>}
  
        const handleClick = (e) => {
          e.preventDefault();
        
          if (attempts >= 3) {
            // Error message if user exceeds login attempts
            setErrMsg("Error you were over the number of login attempts. Try again later.");
            return;
          }
    
          loginCall(
            { username: username.current.value, password: password.current.value },
            dispatch
          )
            .then(() => {
              if (user) {
                setSuccess(true);
                setAttempts(0);
                console.log(user);
                navigate("/");
              } else {
                setSuccess(false);
                setAttempts(attempts + 1);
                setErrMsg("Error, the password or username was invalid");
              };
            })
            .catch(() => {
              setSuccess(false);
              setAttempts(attempts + 1);
              setErrMsg("Error, the password or username was invalid");
            
            });
        };
        
        try {
        } catch (error) {
          
        
        console.log(user);
        }
      return (
        <div className="wrapper fadeInDown">
          <div id="formContent">
            {/* Tabs Titles */}
            <h2 className="active"> Sign In </h2>
            <h2 className="inactive underlineHover" ><a href="/register">Sign Up</a></h2>
    
       
    
            {/* Login Form */}
            <form onSubmit={handleClick}>
              <input type="text" id="login" className="fadeIn second" name="username" placeholder="Username" ref={username} required />
              <input type="password" id="password" className="fadeIn third" name="password" placeholder="password" ref={password} required />
              <input type="submit" className="fadeIn fourth" value="Log In" />
               
            </form>
    
            {/* Remind  Password  */}
            <div id="formFooter">
              <a className="underlineHover" href="/PasswordChange">Forgot Password?</a>
            </div>
          </div>
        </div>
        
      );
}  