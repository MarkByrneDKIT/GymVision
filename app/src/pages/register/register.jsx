import "./register.css";
import { useRef } from "react"
import {loginCall} from "../../apiCalls"
import { useContext} from "react"
import { AuthContext } from "../../context/AuthContext";
import homeIcon2 from "../Images/homeIcon2.png";
import {Link} from 'react-router-dom';
import Footer from "../../components/Footer/Footer";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
 

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const onChange =() => {};
    const navigate= useNavigate();
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
    
   
     
    const handleClick = async (e) => {
      e.preventDefault();
      if(confirmPassword.current.value !== password.current.value){
        confirmPassword.current.setCustomValidity("Passwords don't match.");
      } else{
        const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
 
        };
        try {
          await axios.post("/auth/register", user);
          navigate("/login");
        } catch (err) {
          console.log(err);
        }
      }
    }
    return (
      
      <div className="wrapper fadeInDown">
      <div id="formContent">
        {/* Tabs Titles */}
        <h2 className="active"> Sign Up </h2>
        <h2 className="inactive underlineHover" ><a href="/login">Sign In</a></h2>

        {/* Login Form */}
        <form onSubmit={handleClick}>
          
          <input type="text" id="login" className="fadeIn second" name="login" placeholder="Username" ref={username} required />
          <input type="text" id="login" className="fadeIn second" name="login" placeholder="Email" ref={email} required />
          <input type={passwordShown ? "text" : "password"  } id="login"  className="fadeIn third" name="login" placeholder="Password" ref={password} required />
          
          <input type={passwordShown ? "text" : "password"  } id = "password"  className="fadeIn third" name="login" placeholder="Confirm Password" ref={password} required />
          <button onClick={togglePassword}>Show Password</button>
        

          <ReCAPTCHA id="CAPTCHA" sitekey="6LdlWlkkAAAAAF91dcFM2-0KlUx_dDmC5cEdfPqI" onChange={handleCaptchaChange}  required = {isCaptchaVerified} />


          <input type="submit" className="fadeIn fourth" value="Register"   />
        </form>
      </div>
    </div>
    );
    }
