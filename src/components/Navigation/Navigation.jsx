import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`nav ${isOpen ? 'is-open' : ''}`} id="main-nav">
      <div className="nav-left">
        <Link to="/" className="nav-brand">élan</Link>
      </div>
      
      <div className={`nav-center ${isOpen ? 'show-menu' : ''}`}>
        <Link to="/about" className="nav-link hoverable">About</Link>
        <Link to="/story" className="nav-link hoverable">Story</Link>
        <Link to="/ingredients" className="nav-link hoverable">Ingredients</Link>
        <Link to="/contact" className="nav-cta hoverable menu-only">Contact</Link>
      </div>

      <div className="nav-right">
        <Link to="/contact" className="nav-cta hoverable hide-mobile" id="contact-btn">Contact</Link>
        
        {/* Hamburger Menu Toggle */}
        <button 
          className="hamburger-btn" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation"
        >
          <span className={`line ${isOpen ? 'open' : ''}`}></span>
          <span className={`line ${isOpen ? 'open' : ''}`}></span>
        </button>
      </div>
    </nav>
  );
}
