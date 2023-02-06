import "./login.css"
import { useRef } from "react"
import {loginCall} from "../../apiCalls"
import { useContext} from "react"
import { AuthContext } from "../../context/AuthContext";
import homeIcon2 from "../Images/homeIcon2.png";
import {Link} from 'react-router-dom';
import Footer from "../../components/Footer/Footer";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
    const username = useRef();
    const password = useRef();
    const onChange =() => {};
    const { user, isFetching, error, dispatch } = useContext(AuthContext);
  
    const handleClick = (e) => {
      e.preventDefault();
      loginCall(
        { username: username.current.value, password: password.current.value },
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
                    <h2 className="welcomeText">Welcome to SetStats</h2> 
                    <form id="loginSmallBox" onSubmit={handleClick}>
                        <input placeholder="Enter Username" type="username" className="username2Input" ref={username} required />
                        <input placeholder="Enter Password" type="password" className="password2Input" ref={password} required />
                        <ReCAPTCHA sitekey="6LdlWlkkAAAAAF91dcFM2-0KlUx_dDmC5cEdfPqI" onChange={onChange}/>
                        <button className="loginButton" type='submit'>Log In</button>
 
                    </form>
                   
 
                    <div id="divider"></div>
                    <div id="registerSmallBox">
                    <div id="signInSmallBox">
                        <p id="registerText">Already Have An Account?</p>
                        <button className="signInButton" href="">Sign-In</button>
                        <button className="register2Button" href="">Sign-Up</button>
                    </div>
                    </div>
                    </div>
                    </div>
                </div>
                <Footer/>
        </div>
    );
}
