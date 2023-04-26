
# GymVision SetStats: AI-Powered Weightlifting Coach

![GymVision Logo](https://user-images.githubusercontent.com/73395028/234131436-c3417bbd-614d-46aa-84a6-b97135a1c973.png)

GymVision SetStats is an AI-assisted weightlifting tracker designed to help beginners and experienced lifters alike improve their technique and track their progress. By utilizing computer vision technology and a user-friendly interface, GymVision SetStats provides real-time feedback and analysis of your workouts, ensuring a safer and more effective exercise experience.

## Features

- Real-time tracking and guidance for three fundamental lifts: shoulder press, deadlift, and squat.
- Dual-webcam system for comprehensive body movement analysis.
- Instant feedback on form, including warnings for incorrect posture or weight positioning.
- Live data visualization on our website, including reps, sets, and form analysis.
- Progress tracking with session history and detailed form analysis.

## Demo

See GymVision SetStats in action: [Live Demo](link_to_live_demo)
## Usage

### Setting up the Laptop

1. Install the SetStats application (Python code) on your computer.
2. Open the project in Visual Studio Code.
3. Open a terminal and navigate to the directory where the code is located.
4. Run the command "squat.py" or "deadlift.py" to begin the lift you want to do.
5. You will then see the camera outputs on your screen. You can organize these as you wish, whether you only want to see the front view or both. You also have the option of connecting external screens to make it easier to see during the lift.
6. To connect your lift session to the website, you need to register or log in to the website.
7. Navigate to the Select Lift page and make sure to click on the correct lift that you have also started on the backend.
8. Make sure that you have selected the correct lift that you are doing, and once you have clicked it, you will be redirected to the lift page.
9. Click on "Get Data" to start sending your lift data to the website.
10. That's it! Your lift data will now be recorded and stored on the website.

### Running the Website Locally

1. Download and open Visual Studio Code.
2. Open a new project/folder.
3. Go to git bash in terminal.
4. Type in “git clone -b main https://github.com/MarkByrneDKIT/GymVision.git”
5. Open two powershell terminal tabs in visual studio code.
6. Cd into the Gymvision folder in both. E.g “cd ./Gymvision”
7. Now cd into app in one terminal and api in the other
8. Run “npm install” in both terminals
9. Let the download finish.
10. Run npm start in api terminal until running.
11. Run npm start in app terminal until development server running.
12. Wait for website to open in google chrome.

### Bug Reports and Feature Requests

To report a bug or request a new feature, please [open an issue](link_to_issues) on our GitHub repository.

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Node.js](https://nodejs.org/en/) - An open-source, cross-platform JavaScript runtime environment.
- [Express.js](http://expressjs.com/) - A minimal and flexible Node.js web application framework.
- [MongoDB](https://www.mongodb.com/) - An open-source, document-oriented database for efficient data storage and retrieval.
- [OpenCV](https://opencv.org/) - A highly optimized library focused on real-time computer vision applications.
- [MediaPipe](https://google.github.io/mediapipe/) - A cross-platform framework for customizable ML solutions in live and streaming media.

## Team

- **Mark Byrne** - Team Lead, Database Developer, UI Developer
- **Richard Collins** - Backend Developer, Scrum Master
- **Liam Denning** - Frontend Developer, Backend Developer, Mobile App Developer
- **Himansh Arora** - User Testing, Software Testing
- **Kealan Crilly** - Security Expert



