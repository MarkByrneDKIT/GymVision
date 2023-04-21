import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './graph-tut.css';

export default function SquatTut() {
  return (
    <div className="container">
      <Navbar />
      <div className="content-section content">
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
            <li>A break while at the top is shown by a straight line higher up on the graph.</li>
            <li>A break while at the bottom is shown by a straight line lower down on the graph</li>
            <li>When the line doesn't go down as far as other drops, that indicates you didn't go low enough on that rep.</li>
            <li>If the line goes too deep, you can se that you dropped down too low, potentially harming your knees in the process.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}