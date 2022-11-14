import "./login.css"
import { useRef } from "react"
import {loginCall} from "../../apiCalls"
import { useContext} from "react"
import { AuthContext } from "../../context/AuthContext";


export default function Login() {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);
  
    const handleClick = (e) => {
      e.preventDefault();
      loginCall(
        { email: email.current.value, password: password.current.value },
        dispatch
      );
      };
      console.log(user);
    return (
        <div>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">SetStats</h3>
                    <span className="loginDesc">AI assisted training!</span>

                </div>
                <div className="loginRight">
                    <div className="loginBox">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Email" type="email" className="loginInput" ref={email} required />
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
