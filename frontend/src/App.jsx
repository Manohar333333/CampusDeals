import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Sell from "./pages/Sell";
import TipsX from "./pages/TipsX";
import Faqs from "./pages/Faqs";
import Footer from "./components/Footer";
import logo from "./assets/logo.png"; 


const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Logo at top */}
        

        {/* Navbar */}
        <Navbar />

       

        {/* Pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/tips" element={<TipsX />} />
          <Route path="/faqs" element={<Faqs />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
