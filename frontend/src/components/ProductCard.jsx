import React, { useState } from "react";
import "./ProductCard.css";

const ProductCard = ({ product, onAddToCart }) => {
  const [showModal, setShowModal] = useState(false);

  // Drafter options
  const drafterOptions = [
    { type: "Budget Friendly", price: 300 },
    { type: "Standard", price: 350 },
    { type: "Premium", price: 400 },
  ];

  const handleAddToCart = () => {
    if (product.name === "Engineering Drafter") {
      setShowModal(true);
    } else {
      onAddToCart(product); // ✅ send product to Buy.jsx
    }
  };

  const handleOptionSelect = (option) => {
    const selectedDrafter = {
      ...product,
      name: `${option.type} Drafter`,
      price: option.price,
    };
    onAddToCart(selectedDrafter); // ✅ send selected option
    setShowModal(false);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">₹{product.price}</p>
      <p className="product-stock">{product.stock} items left</p>
      <button className="add-to-cart" onClick={handleAddToCart}>
        {product.name === "Engineering Drafter" ? "Choose Option" : "Add to Cart"}
      </button>

      {/* Modal for Drafter */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Select Drafter Type</h2>
            {drafterOptions.map((option, index) => (
              <button
                key={index}
                className="option-btn"
                onClick={() => handleOptionSelect(option)}
              >
                {option.type} – ₹{option.price}
              </button>
            ))}
            <button className="close-btn" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
