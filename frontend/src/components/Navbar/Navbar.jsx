import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "../index.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close sidebar when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      {/* Left side with logo + hamburger */}
      <div className="nav-left">
        <button
          className="hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
        <img src={logo} alt="Campus Deals Logo" className="logo" />
        <h1 className="logo-text">Campus Deals</h1>
      </div>

      {/* Desktop Links */}
      <div className="nav-links desktop">
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "nav-link-active" : ""}`}
        >
          Home
        </Link>
        <Link
          to="/buy"
          className={`nav-link ${location.pathname === "/buy" ? "nav-link-active" : ""}`}
        >
          Buy
        </Link>
        <Link
          to="/sell"
          className={`nav-link ${location.pathname === "/sell" ? "nav-link-active" : ""}`}
        >
          Sell
        </Link>
        <Link
          to="/tips"
          className={`nav-link ${location.pathname === "/tips" ? "nav-link-active" : ""}`}
        >
          Tips
        </Link>
      </div>

      {/* Sidebar for Mobile */}
      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          ✖
        </button>
        <ul>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/buy" onClick={() => setMenuOpen(false)}>Buy</Link>
          </li>
          <li>
            <Link to="/sell" onClick={() => setMenuOpen(false)}>Sell</Link>
          </li>
          <li>
            <Link to="/tips" onClick={() => setMenuOpen(false)}>Tips</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
