import "./register.css";
import { useRef } from "react"
import {loginCall} from "../../apiCalls"
import { useContext} from "react"
import { AuthContext } from "../../context/AuthContext";
import homeIcon2 from "../Images/homeIcon2.png";
import {Link} from 'react-router-dom';
import Footer from "../../components/footer/footer";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
 

export default function Register() {

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const securityQuestion = useRef();
  const securityAnswer = useRef();
  const onChange = () => {};
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match.");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        securityQuestion: securityQuestion.current.value,
        securityAnswer: securityAnswer.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
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
            type="text"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder="Password"
            ref={password}
            required
          />
          <input
            type="text"
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
            <option value="question1">What was your childhood nickname?</option>
            <option value="question2">What is the name of your favorite pet?</option>
            <option value="question3">In what city did you meet your spouse/significant other?</option>
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
