import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa"; // Beautiful arrow from react-icons
import "./ScrollToTop.css";

const ScrollToTop = () => {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user reached bottom
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    showArrow && (
      <button className="scroll-to-top" onClick={scrollToTop}>
        <FaArrowUp />
      </button>
    )
  );
};

export default ScrollToTop;
