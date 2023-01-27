import { React, useState } from "react";
// import axios from "axios";
import "./style/LoginSignup.css";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  return (
    <>
      <div className="center">
        <h1>Signup</h1>
        <form method="post">
          <div className="txt_field">
            <input type="text" required></input>
            <span></span>
            <label>Username</label>
          </div>
          <div className="txt_field">
            <input type="password" required></input>
            <span></span>
            <label>Password</label>
          </div>
          <div className="txt_field">
            <input type="password" required></input>
            <span></span>
            <label>Confirm Password</label>
          </div>
          <button className="submit">SignUp</button>
          <div className="login_link">
            Already signed up? <a href="/">Login</a>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupPage;
