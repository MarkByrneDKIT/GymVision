import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './graph-tut.css';

export default function SquatTut() {
  return (
    <div>
      <Navbar />
    <div className="container">
      <div className="content-section">
        <div className="squat-video-container">
          <img id="graphImg" src="https://storage.googleapis.com/gymvision-image-storage/mark-graph-1-1679340485.3177621.jpg" alt='exampleGraph' />
        </div>
        <div className="squat-text-container">
          <h2>Step-by-Step Guide</h2>
          <ol>
            <li>An example graph is displayed above.</li>
            <li>The Y axis is the height and the X axis is the time.</li>
            <li>Mixing the two together you can read how quick you moved up and down during the set by how steep the decrease and increase of the line.</li>
            <li>You can tell how long you are at a standstill at the top or bottom by how straight the line</li>
            <li>A break while at thetop is shown by a straight line higher up on the graph.</li>
            <li>A break while at the bottom is shown by a straight line lower down on the graph</li>
            <li>When the line doesn't go down as far as other drops, that indicates you didn't go low enough on that rep.</li>
            <li>If the line goes too deep, you can see that you dropped down too low, potentially harming your knees in the process.</li>
          </ol>
        <h2>Additional Tips</h2>
        <ul>
          <li>Compare your graphs over time to track your progress and identify any patterns or areas for improvement.</li>
          <li>Use the graph to understand the consistency of your reps and sets during a training session.</li>
          <li>Pay attention to the line's smoothness to identify any sudden movements that may indicate poor form or potential injuries.</li>
          <li>Consider sharing your graphs with a coach or trainer for expert feedback and advice on improving your performance.</li>
        </ul>
      </div>
    </div>
  </div>
  </div>
);
}