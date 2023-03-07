import "./register.css";
import { useRef } from "react"
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const onChange =() => {};
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
      <div className="wrapper fadeInDown">
      <div id="formContent">
        {/* Tabs Titles */}
        <h2 className="active"> Sign Up </h2>
        <h2 className="inactive underlineHover" ><a href="/login">Sign In</a></h2>



        {/* Login Form */}
        <form onSubmit={handleClick}>
          <input type="text" id="login" className="fadeIn second" name="login" placeholder="Username" ref={username} required />
          <input type="text" id="password" className="fadeIn third" name="login" placeholder="Password" ref={password} required />
          <input type="text" id="password" className="fadeIn third" name="login" placeholder="Confirm Password" required />
          <ReCAPTCHA id="CAPTCHA" sitekey="6LdlWlkkAAAAAF91dcFM2-0KlUx_dDmC5cEdfPqI" onChange={onChange} />
          <input type="submit" className="fadeIn fourth" value="Register" />
        </form>
      </div>
    </div>
    );
}
