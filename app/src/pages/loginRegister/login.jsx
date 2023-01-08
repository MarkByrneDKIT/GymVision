import "./login.css"
import { useRef } from "react"
import {loginCall} from "../../apiCalls"
import { useContext} from "react"
import { AuthContext } from "../../context/AuthContext";




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
             <div class="row">
  <div class="column">
    <div class="card">Register</div>
  </div>
  <div class="column">
    <div class="card">Lifts</div>
  </div>
  <div class="column">
    <div class="card">Rep Count</div>
  </div>
  <div class="column">
    <div class="card">Feedback</div>
  </div>
</div> 
          <h3 className="loginLogo">SetStats</h3>      
           
            <div className="loginWrapper">
                <div className="loginLeft">
                </div>
                
                <div className="loginRight">
                    <div className="loginBox">
                    <form className="loginBox" onSubmit={handleClick}>
                        <h4 className= "Username">Username</h4>
                        <input placeholder="Enter Username" type="username" className="loginInput" ref={username} required />
                        <h5 className= "Password">Password</h5>
                        <input placeholder="Enter Password" type="password" className="loginInput" ref={password} required />
                        <button className="loginButton" type='submit'>
                            Log In
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                        
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
