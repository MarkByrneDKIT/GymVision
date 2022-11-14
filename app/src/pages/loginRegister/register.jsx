import "./register.css";
import { useRef } from "react"
import axios from "axios";
import { useNavigate } from "react-router";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate= useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if(confirmPassword.current.value !== password.current.value){
      confirmPassword.current.setCustomValidity("Passwords don't match.");
    } else{
      const user = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value
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
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SetStats</h3>
          <span className="loginDesc">
          AI assisted training!
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" ref={username} className="loginInput" />
            <input placeholder="Email" ref={email} type="email" className="loginInput" />
            <input placeholder="Password" ref={password} type="password" className="loginInput" />
            <input placeholder="Repeat Password" ref={confirmPassword} type="password" className="loginInput" />
            <button className="loginButton" type="submit">Sign Up</button>
            <button className="loginRegisterButton">
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}