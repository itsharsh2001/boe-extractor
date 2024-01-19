import React, {useState, useEffect} from "react";
import axios from "axios";

// import jwt from 'jsonwebtoken';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate, useLocation } from "react-router-dom";
// import jwt_decode from "jwt-decode";
import { jwtDecode } from "jwt-decode";


import classes from "./SignIn.module.css";

function SignIn(props) {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isTokenExpired = (t) => Date.now() >= jwtDecode(t || "null").exp * 1000;

  const handleLogin = async () => {
    try {
    console.log(username);
    console.log(password);
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      const token = response.data.token;
      // const expirytime = response.data.expirytime;
      console.log(token, 'token is here');
      // console.log(expirytime, 'expirytime is here');
      localStorage.setItem("token", token);
     
      navigate('/dashboard');

      // console.log('handle signin ke baad');
      // Redirect or perform actions after successful login
    } catch (error) {
        console.error("Login failed", error);
        if (error.response && error.response.status === 401) {
          // Wrong credentials or token timeout
          toast.error("Invalid credentials", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          // Other errors
          toast.error("Login failed", {
            position: toast.POSITION.TOP_CENTER,
          });}
    }
  };

  let expiry_time = ''

  
  const navigate = useNavigate();

  useEffect(() => {
    
      let token = localStorage.getItem("token");
      if (token) {
        navigate("/dashboard");
      }
    
  }, []);

  // useEffect(() => {
    // localStorage.setItem("token", token);
      // expiry_time = localStorage.getItem("expirytime");
      // console.log('expiry_time1', expiry_time)
      // if (expiry_time < Date.now() / 1000) {
      //   // Token has expired
      //   console.log('expiry_time2', expiry_time)
      //   toast.error("Token has expired. Please log in again.", {
      //     position: toast.POSITION.TOP_CENTER,
      //   });
      // }
  // }, [])
  

  return (
    <div className={classes.signin}>
      <main>
        <img src="/GTLogoWhite.png" alt="" />
        <h6>Login</h6>
        <input placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="" id="" />
        <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="" id="" />
        <button onClick={handleLogin}>Submit</button>

        <ToastContainer/>
      </main>
    </div>
  );
}

export default SignIn;
