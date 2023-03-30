import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './squat-tut.css';

export default function SquatTut() {
  return (
    <div className="container">
      <Navbar />
      <div className="hero-section">
        <h1>How to Squat Properly</h1>
        <p>Learn the correct technique for performing squats</p>
      </div>
      <div className="content-section content">
        <div className="squat-video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/gsNoPYwWXeM"
            title="Fix Your Squat (In Just 3-Minutes)"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div className="squat-text-container">
          <h2>Step-by-Step Guide</h2>
         
        </div>
      </div>
    </div>
  );
}