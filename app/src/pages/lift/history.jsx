import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import SessionList from '../../components/Sessions/sessionList';
import './history.css';

export default function History() {
  return (
    <div>
        <Navbar />
      <div className='container'>
      <div className="session-list-container">
        <SessionList />
      </div>
    </div>
    </div>
    
  );
}