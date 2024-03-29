import React from 'react';
import './navbar.css';
import logo from '../../pages/Images/logo-white.png';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="logo-container">
          <img src={logo} alt="Logo" />
        </a>
        <div className="menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className="nav-links">
          <li><a className="links" href="/history">History</a></li>
          <li><a className="links" href="/LiftSelection">Lifts</a></li>
          <li><a className="links" href="/login">Logout</a></li>
        </ul>
      </div>
    </nav>
  );
}