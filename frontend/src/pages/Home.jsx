import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaPlusCircle, FaQuestionCircle, FaLightbulb, FaShieldAlt } from "react-icons/fa";
import "./Home.css"; // updated import

const Home = () => {
  return (
    <div className="home">
      <div className="home-content">
        
        <h1>Campus Deals</h1>
        <p>Your one-stop shop for student-to-student exchange.</p>

        <div className="card-grid">
          <Link to="/buy" className="card">
            <FaShoppingCart size={24} />
            <h3>Buy Now</h3>
          </Link>

          <Link to="/sell" className="card">
            <FaPlusCircle size={24} />
            <h3>Sell an Item</h3>
          </Link>

          <Link to="/faqs" className="card">
            <FaQuestionCircle size={24} />
            <h3>FAQ’s</h3>
          </Link>

          <Link to="/tips" className="card">
            <FaLightbulb size={24} />
            <h3>Tips</h3>
          </Link>

          <Link to="/admin" className="card">
            <FaShieldAlt size={24} />
            <h3>Admin</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
