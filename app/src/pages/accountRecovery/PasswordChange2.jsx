import React, { useContext, useState } from "react";
import "./recovery.css";
import { useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function PasswordChangeTwo() {
  const newPassword = useRef();
  const confirmPassword = useRef();
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.current.value !== confirmPassword.current.value) {
      console.log("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.put(`/users/${user._id}`, {
        userId: user._id,
        password: newPassword.current.value,
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="wrapper fadeInDown">
        <div id="formContent">
          {/* Tabs Titles */}
          <h2 className="active">Forgot Password</h2>

          {/* Forgot Pass Form*/}
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              id="password"
              className="fadeIn second"
              name="username"
              placeholder="New Password"
              ref={newPassword}
              required
            />
            <input
              type="password"
              id="password"
              className="fadeIn second"
              name="username"
              placeholder="Confirm Password"
              ref={confirmPassword}
              required
            />
            <input
              type="submit"
              className="fadeIn fourth"
              value="Reset Password"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
