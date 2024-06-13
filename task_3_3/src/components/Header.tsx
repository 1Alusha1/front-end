import React from "react";
import logo from "../assets/foxminded-logo.png";
const Header = () => {
  return (
    <header>
      <div className="content">
        <h1>Create Account</h1>
        <img src={logo} alt="foxminded-logo" />
      </div>
    </header>
  );
};

export default Header;
