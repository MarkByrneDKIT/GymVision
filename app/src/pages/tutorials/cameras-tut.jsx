import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './squat-tut.css';

export default function SquatTut() {
  return (
    <div className="container">
      <Navbar />
      <div className="content-section content">
       
        <div className="squat-text-container">
          <h2>Enviroment</h2>
         <p>The weightlifting area of the gym, which is frequently apart from the cardio equipment and machines, is where you'll typically find the squat rack. Normally, the space around the squat rack is open, allowing lifters to move around freely and carry out their exercises safely.
            The actual squat rack is a sizable, metal construction with movable safety bars, hooks, and occasionally an attached weight tree or plate storage rack. The barbell is held in place by the bars and hooks as the lifter performs the squat exercise. If the lifter is unable to complete a repetition or must stop the lift, the safety bars can be adjusted to catch the barbell.
            To minimize noise and safeguard the fitness centre equipment from harm, the flooring around the squat rack is typically made of rubber or other impact-absorbing materials. To assist lifters in positioning themselves correctly for the exercise, the flooring may also be marked with lines or grids.
            There might be additional squat racks or power racks, benches, dumbbells, and other barbells nearby, as well as other weightlifting apparatus. Since lifters are typically more intense and focused during their heavy lifting sessions, the atmosphere around the squat rack is frequently serious and focused.
        </p>
          <h2>Step-by-Step Guide</h2>
          <h3>Setting Up The Cameras</h3>
          <ol>
            <li>Determine if you will be using a laptop or a desktop computer to record your lift.</li>
            <li>If you are using a laptop, check to see if it has a built-in webcam. If not, you will need to use an external webcam. If you are using a desktop computer, you will need to use an external webcam.</li>
            <li>Position the front camera (Camera 1) approximately 1.5 meters in front of where you will be completing your lift. This will give you a clear view of the lift from the front.</li>
            <li>Adjust the height of the camera to 1 meter to ensure that it is level with your body and captures the lift properly.</li>
            <li>Place the side camera (Camera 2) approximately 1.5 meters to the side of where you will be completing your lift. This will give you a clear view of the lift from the side.</li>
            <li>Adjust the height of the camera to 1 meter to ensure that it is level with your body and captures the lift properly.</li>
            <li>Tidy up the camera wires to prevent tripping hazards or damage to the equipment.</li>
            <li>Connect the cameras to your computer or laptop using the appropriate cables or adapters.</li>
          </ol>
          <h3>Setting Up The Laptop</h3>
          <ol>
            <li>Install the SetStats application (Python code) on your computer.</li>
            <li>Open the project in Visual Studio Code.</li>
            <li>Open a terminal and navigate to the directory where the code is located.</li>
            <li>Run the command "squat.py" or "deadlift.py" to begin the lift you want to do.</li>
            <li>You will then see the camera outputs on your screen. You can organize these as you wish, whether you only want to see the front view or both. You also have the option of connecting external screens to make it easier to see during the lift.</li>
            <li>To connect your lift session to the website, you need to register or log in to the website.</li>
            <li>Navigate to the Select Lift page and make sure to click on the correct lift that you have also started on the backend.</li>
            <li>Make sure that you have selected the correct lift that you are doing, and once you have clicked it, you will be redirected to the lift page.</li>
            <li>Click on "Get Data" to start sending your lift data to the website.</li>
            <li>That's it! Your lift data will now be recorded and stored on the website.</li>

          </ol>
        </div>
      </div>
    </div>
  );
}