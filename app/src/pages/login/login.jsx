import "./login.css"
import { useRef } from "react"
import {loginCall} from "../../apiCalls"
import { useContext} from "react"
import { AuthContext } from "../../context/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate} from 'react-router-dom';


export default function Login() {
    const username = useRef();
    const password = useRef();
    const onChange =() => {};
    const { user, isFetching, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
  
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
              <input type="text" id="password" className="fadeIn third" name="password" placeholder="password" ref={password} required />
              <ReCAPTCHA id="CAPTCHA" sitekey="6LdlWlkkAAAAAF91dcFM2-0KlUx_dDmC5cEdfPqI" onChange={onChange} required />
              <input type="submit" className="fadeIn fourth" value="Log In" />
            </form>
    
            {/* Remind Passowrd */}
            <div id="formFooter">
              <a className="underlineHover" href="/recovery">Forgot Password?</a>
            </div>
          </div>
        </div>
      );
    };
                    

