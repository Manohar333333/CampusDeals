import React from "react";
import "./Tips.css";
import { FaMusic, FaBook, FaUtensils, FaLaptop } from "react-icons/fa";

const Tips = () => {
  const tipsData = [
    {
      category: "Entertainment",
      id: 1,
      icon: <FaMusic />,
      title: "Best Party Spot",
      description: "Star Drive offers exclusive GVP student discounts of 10-15% on all events and celebrations."
    },
    {
      category: "Academic",
      id: 2,
      icon: <FaBook />,
      title: "Free A4 Sheets",
      description: "Access complimentary stationery from faculty cabins and laboratory areas after internal examinations."
    },
    {
      category: "Food",
      id: 3,
      icon: <FaUtensils />,
      title: "Best Budget Biryani",
      description: "Dum Safar & Paradise restaurants near Madhurawada offer authentic biryani at student-friendly prices."
    },
    {
      category: "Technology",
      id: 4,
      icon: <FaLaptop />,
      title: "Discounted Software",
      description: "Students get free or discounted licenses for Microsoft, JetBrains, and GitHub Pro."
    },
  ];

  return (
    <div className="tips-page">
      <h1 className="tips-title">Smart Student Tips</h1>
      <p className="tips-subtitle">
        Essential insights and strategies curated by seniors to help you succeed in campus life.
      </p>

      <div className="tips-grid">
        {tipsData.map((tip) => (
          <div key={tip.id} className="tip-card">
            <div className="tip-icon">{tip.icon}</div>
            <h3 className="tip-title">{tip.title}</h3>
            <p className="tip-description">{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tips;
