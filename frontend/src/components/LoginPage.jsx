import { React, useState } from "react";
// import axios from "axios";
import "./style/LoginSignup.css"
import { useNavigate } from "react-router-dom";

function LoginPage() {
  return (
    <>
    <div className="center">
      <h1>Login</h1>
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
        {/* <div className="pass">Forgot Password?</div> */}
        <button className="submit">Login</button>
        <div className="signup_link">
           <a href="/signup">New User?</a>
        </div>
      </form>
    </div>
  </>
  );
}

export default LoginPage;
