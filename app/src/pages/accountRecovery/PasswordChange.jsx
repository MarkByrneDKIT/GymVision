import React, { useContext, useState } from "react";
import "./recovery.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function PasswordChange() {
  const answer = useRef();
  const newPassword = useRef();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [error, setError] = useState("");

  const handleSubmitAnswer = () => {
    if (answer.current.value === user.securityAnswer) {
      navigate("/PasswordChange2");
    } else {
      setError("Incorrect answer");
    }
  };

  return (
    <div className="container">
      <div className="wrapper fadeInDown">
        <div id="formContent">
          {/* Tabs Titles */}
          <h2 className="active"> Forgot Password </h2>

          {/* Forgot Pass Form*/}
          <form>
            <span>{user.securityQuestion}</span>
            <input
              type="text"
              id="answer"
              className="fadeIn second"
              name="username"
              placeholder="Answer"
              ref={answer}
              required
            />
            {error && <p className="error-message">{error}</p>}
            <input
              type="button"
              className="fadeIn fourth"
              onClick={handleSubmitAnswer}
              value="Submit Answer"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
