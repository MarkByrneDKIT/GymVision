import React from 'react';
import Navbar from "../../components/Navbar/Navbar";
import SessionList from '../../components/Sessions/sessionList';
import './history.css';

export default function History() {
  return (
    <div className='container'>
      <Navbar />
      <div className="session-list-container">
        <SessionList />
      </div>
    </div>
  );
}