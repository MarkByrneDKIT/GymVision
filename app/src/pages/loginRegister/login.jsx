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
          <h3 className="loginLogo">SetStats</h3>           
            <div className="loginWrapper">
            <span className="loginDesc">AI assisted training!</span>
                <div className="loginLeft">
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Username" type="username" className="loginInput" ref={username} required />
                        <input placeholder="Password" type="password" className="loginInput" ref={password} required />
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
