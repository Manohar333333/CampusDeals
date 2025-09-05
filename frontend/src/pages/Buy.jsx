import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import "./Buy.css";

// ✅ Import images
import calciImg from "../assets/Calci.jpg";
import drafterImg from "../assets/Drafter.jpeg";
import chartHolderImg from "../assets/chart holder.jpg";
import mechCoatImg from "../assets/Mechanical.jpeg";
import chemCoatImg from "../assets/Chemical.jpeg";

const Buy = () => {
  const products = [
    { id: 1, name: "Scientific Calculator", price: 450, stock: 5, image: calciImg },
    { id: 2, name: "Engineering Drafter", price: 800, stock: 3, image: drafterImg },
    { id: 3, name: "Chart Holder", price: 50, stock: 15, image: chartHolderImg },
    { id: 4, name: "Mechanical Lab Coat", price: 250, stock: 8, image: mechCoatImg },
    { id: 5, name: "Chemical Lab Coat", price: 250, stock: 3, image: chemCoatImg }
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="buy-page">
      <h1 className="buy-title">Available Products</h1>

      {/* 🔍 Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 🛒 Product Grid */}
      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))
        ) : (
          <p className="no-results">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Buy;
