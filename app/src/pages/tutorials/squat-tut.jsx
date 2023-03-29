import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './squat-tut.css';

export default function SquatTut() {
  return (
    <div>
      <Navbar />
      <div className="hero-section">
        <h1>How to Squat Properly</h1>
        <p>Learn the correct technique for performing squats</p>
      </div>
      <div className="content-section">
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/YVfyYrEmzgM"
            title="Squat Tutorial Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div className="text-container">
          <h2>Step-by-Step Guide</h2>
          <p>
            Squats are one of the most important exercises you can do for your lower body. They work the quadriceps, hamstrings,
            glutes, and even your core muscles. However, it's important to perform them with proper form to avoid injury and
            maximize their effectiveness. Here's a step-by-step guide to performing squats correctly:
          </p>
          <ol>
            <li>Start by standing with your feet shoulder-width apart and your toes pointing slightly outward.</li>
            <li>Engage your core muscles and keep your back straight as you lower your body by bending your knees and hips.</li>
            <li>Continue lowering your body until your thighs are parallel to the ground.</li>
            <li>Pause briefly, then push through your heels to return to the starting position.</li>
            <li>Repeat for the desired number of reps.</li>
          </ol>
          <h2>Tips for Proper Form</h2>
          <p>
            While performing squats, keep the following tips in mind to maintain proper form:
          </p>
          <ul>
            <li>Keep your chest up and your shoulders back to maintain good posture.</li>
            <li>Make sure your knees are aligned with your toes and don't extend past them.</li>
            <li>Don't let your knees collapse inward, which can put undue stress on your joints.</li>
            <li>Breathe in as you lower your body and exhale as you push back up to the starting position.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}