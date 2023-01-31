import "./login.css"
import { useRef } from "react"
import {loginCall} from "../../apiCalls"
import { useContext} from "react"
import { AuthContext } from "../../context/AuthContext";
import homeIcon2 from "../Images/homeIcon2.png";
import {Link} from 'react-router-dom';




export default function Login() {
    const username = useRef();
    const password = useRef();
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
        <Link to="/register"><img id="homeButton" src={homeIcon2} alt={"homeIcon2"} href=""/>  </Link>
          
          <h3 className="loginLogo"></h3>      
           
            <div id="loginWrapper">
                <div className="left">
                </div>
                
                <div className="middle">
                    <div id="box">
                    <form id="loginSmallBox" onSubmit={handleClick}>
                        <input placeholder="Enter Username" type="username" className="usernameInput" ref={username} required />
                        <input placeholder="Enter Password" type="password" className="passwordInput" ref={password} required />
                        <button className="loginButton" type='submit'>Log In</button>
                        <span className="loginForgot">Forgot Password?</span>
                    </form>

                    <div id="divider"></div>
                    <div id="registerSmallBox">
                        <p id="registerText">Already Have An Account?</p>
                        <button className="registerButton" href="">Sign-Up</button>
                    </div>
                    
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
