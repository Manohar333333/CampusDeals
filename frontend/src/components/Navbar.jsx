import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg"; // ✅ import logo
import "../index.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo-container">
        <img src={logo} alt="Campus Deals Logo" className="logo" />
        <h1 className="logo-text">Campus Deals</h1>
      </div>

      {/* Links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/buy">Buy</Link>
        <Link to="/sell">Sell</Link>
        <Link to="/tips">Tips</Link>
        <Link to="/faqs">FAQs</Link>
      </div>
    </nav>
  );
};

export default Navbar;

