import { React, useState } from "react";
import "./style/LoginSignup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function setLogin(e) {
    // console.log(email);
    e.preventDefault(); //Prevent Reloading
    axios
      .post(
        "http://localhost:7000/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200) {
          //Redirect to Home
          navigate("/home");
        }
      })
      .catch((Err) => {
        if (Err) {
          alert("Invalid Credentials or User Not Registered!");
        }
      });
  }

  return (
    <>
      <div className="center">
        <h1>Login</h1>
        <form method="post">
          <div className="txt_field">
            <input
              type="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <span></span>
            <label>Email</label>
          </div>
          <div className="txt_field">
            <input
              type="password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <span></span>
            <label>Password</label>
          </div>
          {/* <div className="pass">Forgot Password?</div> */}
          <button className="submit" onClick={setLogin}>
            Login
          </button>
          <div className="signup_link">
            <a href="/signup">New User?</a>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
