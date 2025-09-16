import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaShoppingCart, 
  FaHistory, 
  FaCog, 
  FaSignOutAlt,
  FaChevronDown 
} from 'react-icons/fa';
import './ProfileDropdown.css';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Mock user data - replace with actual user data from context/state management
  useEffect(() => {
    // This would typically come from your auth context or API
    const mockUser = {
      name: 'Manohar Maradana',
      email: 'maradanamanohar333@gmail.com',
      avatar: null, // or avatar URL
      cartItems: 3,
      orderCount: 12
    };
    setUser(mockUser);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Add your logout logic here
    // This might involve clearing tokens, updating auth context, etc.
    console.log('Logging out...');
    // For now, just close the dropdown and potentially redirect
    setIsOpen(false);
    // navigate('/login'); // Uncomment when you have a login page
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      {/* Profile Icon/Button */}
      <button 
        className="profile-button"
        onClick={toggleDropdown}
        aria-label="Profile menu"
      >
        <div className="profile-avatar">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} />
          ) : (
            <span className="avatar-initials">{getInitials(user.name)}</span>
          )}
        </div>
        <FaChevronDown 
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="dropdown-menu">
          {/* User Info Section */}
          <div className="user-info">
            <div className="user-avatar-large">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <span className="avatar-initials-large">{getInitials(user.name)}</span>
              )}
            </div>
            <div className="user-details">
              <h4>{user.name}</h4>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="dropdown-divider"></div>

          {/* Menu Items */}
          <div className="dropdown-items">
            <Link 
              to="/profile" 
              className="dropdown-item"
              onClick={closeDropdown}
            >
              <FaUser className="item-icon" />
              <span>My Profile</span>
            </Link>

            <Link 
              to="/cart" 
              className="dropdown-item"
              onClick={closeDropdown}
            >
              <FaShoppingCart className="item-icon" />
              <span>Cart</span>
              {user.cartItems > 0 && (
                <span className="badge">{user.cartItems}</span>
              )}
            </Link>

            <Link 
              to="/orders" 
              className="dropdown-item"
              onClick={closeDropdown}
            >
              <FaHistory className="item-icon" />
              <span>Order History</span>
              <span className="order-count">({user.orderCount})</span>
            </Link>

            <Link 
              to="/settings" 
              className="dropdown-item"
              onClick={closeDropdown}
            >
              <FaCog className="item-icon" />
              <span>Settings</span>
            </Link>
          </div>

          <div className="dropdown-divider"></div>

          {/* Logout */}
          <button 
            className="dropdown-item logout-item"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="item-icon" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;