import React from "react";
import logo from "../../Images/logo.png";
import "./Navbar.css";
import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="Navbar-container">
      <div className="logo-nav">
          <img alt="" src={logo} className="logo"/>
      </div>
      <Link className="nav" to="/">Home</Link>
      <Link className="nav" to="/help">Help</Link>
      <Outlet />
    </div>
  );
};
export default Navbar;
