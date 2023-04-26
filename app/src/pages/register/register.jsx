import "./register.css";
import { useRef } from "react"
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { useNavigate } from "react-router";
 

export default function Register() {

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const securityQuestion = useRef();
  const securityAnswer = useRef();
  const onChange = () => {};
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    // if (confirmPassword.current.value !== password.current.value) {
    //   confirmPassword.current.setCustomValidity("Passwords don't match.");
    // } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        securityQuestion: securityQuestion.current.value,
        securityAnswer: securityAnswer.current.value
      };
      try {
        console.log(user)
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    
  };
  

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        {/* Tabs Titles */}
        <h2 className="active"> Sign Up </h2>
        <h2 className="inactive underlineHover">
          <a href="/login">Sign In</a>
        </h2>

        {/* Login Form */}
        <form onSubmit={handleClick}>
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="Username"
            ref={username}
            required
          />
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="Email"
            ref={email}
            required
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder="Password"
            ref={password}
            required
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder="Confirm Password"
            required
          />
          <select
            id="securityQuestion"
            className="fadeIn third"
            name="securityQuestion"
            ref={securityQuestion}
            required
          >
            <option value="">Select a security question</option>
            <option>What was your childhood nickname?</option>
            <option>What is the name of your favorite pet?</option>
            <option>In what city did you meet your spouse/significant other?</option>
            {/* Add more options as needed */}
          </select>
          <input
            type="text"
            id="securityAnswer"
            className="fadeIn fourth"
            name="securityAnswer"
            placeholder="Security Answer"
            ref={securityAnswer}
            required
            />
          
          <ReCAPTCHA id="CAPTCHA" sitekey="6LdlWlkkAAAAAF91dcFM2-0KlUx_dDmC5cEdfPqI" onChange={onChange} />
          <input type="submit" className="fadeIn fourth" value="Register" />
        </form>
      </div>
    </div>
    );
    }
