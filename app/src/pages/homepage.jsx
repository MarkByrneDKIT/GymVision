import './homepage.css'
import Navbar from '../components/Navbar/Navbar'
import ContactForm from "../components/contactForm/contactForm";
import Footer from "../components/footer/footer";
import SessionList from '../components/Sessions/sessionList'
import { useNavigate } from 'react-router-dom';
import PreviousSessionDetails from '../components/lastSession/PreviousSessionDetails';
import PubNub from 'pubnub';

export default function Homepage() {
    const navigate = useNavigate();

    const pubnub = new PubNub({
        subscribeKey: 'sub-c-66e361b6-c13c-411e-a780-9b16fc2e0c36',
        publishKey: 'pub-c-d8d5b759-3b66-4d5b-ae7d-b119cc474e80',
        userId: 'liamdenningsetstats',
      });

      const handleClick = async (e, rep, set) => {
          pubnub.publish(
            {
              channel: 'Setstats',
              message: { reps: rep, sets: set},
            },
            function (status, response) {
              console.log(status);
              console.log(response);
            },
          );
          navigate('/squat');
      };

    return (
        <div>
           <Navbar/> 
        <div className="container">
            <div className="content">
                <div className="quick-start">
                    <div className="banner">Quick Start</div>
                    <button className="start-button" onClick={event => handleClick(event,3,3)}>Heavy</button>
                    <button className="start-button" onClick={event => handleClick(event, 12,3)}>Light</button>
                    <button className="start-button" onClick={event => handleClick(event, 6,3)}>Muscle Gain</button>
                    <button className="start-button" onClick={event => handleClick(event, 5,5)} >5 x 5</button>
                    <button className="start-button" onClick={event => handleClick(event, 1000, 2)}>Practice</button>
                </div>
                <div className="previous-sessions">
                    <div className="banner">Previous Sessions</div>
                    <div className="session-container">
                        <SessionList/>
                    </div>
                </div>
                <button className="quick-session" onClick={() => navigate('/squat')}>
                    Start Squat
                </button>
                <div className="previous-session-details">
                    <div className="banner">Latest Session Details</div>
                    <PreviousSessionDetails/>
                </div>
                
                <div className="contact-form">
                    <div className="banner">Tutorials</div>
                    <button className="start-button" onClick={() => navigate('/SquatTut')}>How to Squat</button>
                    <button className="start-button" onClick={() => navigate('/graphTut')}>How to Read SetStats Graph</button>
                    <button className="start-button" onClick={() => navigate('/camerasTut')}>How to Setup Cameras</button>
                </div>
            </div>
        </div>
        </div>
     );
}
