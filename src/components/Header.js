import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";

import classes from './Header.module.css'

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {

     
      localStorage.removeItem("token");
     
      navigate('/login');

      // console.log('handle signin ke baad');
      // Redirect or perform actions after successful login
    } catch (error) {
        console.error("Login failed", error);
    }
  };

  return (
    <header className={classes.header}>
        <span>
            {/* <img src="/menu.png" alt="" /> */}
            <img src="/gtlogo.png" alt="" />
        </span>
        {/* <span>
            <img src="/user.png" alt="" />
            <p>Chris Swanson</p>
            <img src="/logout.png" alt="" />
        </span> */}
        <button onClick={handleLogout}>Logout</button>
    </header>
  )
}

export default Header