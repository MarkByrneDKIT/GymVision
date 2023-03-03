import "./register.css";

import { useRef } from "react"
import {loginCall} from "../../apiCalls"
import { useContext} from "react"
import { AuthContext } from "../../context/AuthContext";
import homeIcon2 from "../Images/homeIcon2.png";
import {Link} from 'react-router-dom';
import Footer from "../../components/footer/footer";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
    const username = useRef();
    const password = useRef();
    const email = useRef();
    const onChange =() => {};
    const { user, isFetching, error, dispatch } = useContext(AuthContext);
  
    const handleClick = (e) => {
      e.preventDefault();
      loginCall(
        { username: username.current.value, password: password.current.value, email: email.current.value },
        dispatch
      );
      };
      console.log(user);
    return (
        <div>
  
        <h1 className="loginLogo">SetStats</h1>
            <div id="loginWrapper">
                <div className="left">
                </div>
                   
                <div className="middle">
                    <div id="box">
                    <form id="loginSmallBox" onSubmit={handleClick}>
                    <h2 className="registerNowtext">Register Now</h2> 
                        <input placeholder="Enter Username" type="username" className="usernameInput" ref={username} required />
                        <input placeholder="Enter Password" type="password" className="passwordInput" ref={password} required />
                       
                        <span className="loginForgot">Forgot Password?</span>
                        <ReCAPTCHA sitekey="6LdlWlkkAAAAAF91dcFM2-0KlUx_dDmC5cEdfPqI" onChange={onChange}/>
                        <h3 className="passwordForget">Enter the email address you used when you joined and we'll send you insructions 
                        to reset your password. For security purposes we will not send you a new password.</h3>
                        
                    </form>
                    <span className="emailAddress">Email Address    <input placeholder="Enter Email" type="username" className="emailInput" ref={email} required /></span>
                
                    <div id="registerSmallBox">
                    <div id="signInSmallBox">
          
                        <button className="registerButton" href="">Sign-Up</button>
                    </div>
                    </div>
                    </div>
                    </div>
                </div>
                <Footer/>
                </div>
    );
}
