import React from "react";
import "../index.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><a href="#">📦 My Orders</a></li>
        <li><a href="#">❤️ Wishlist</a></li>
        <li><a href="#">⚙️ Settings</a></li>
        <li><a href="#">🚪 Logout</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
