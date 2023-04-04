import './homepage.css'
import Navbar from '../components/Navbar/Navbar'
import ContactForm from "../components/contactForm/contactForm";
import Footer from "../components/footer/footer";
import SessionList from '../components/Sessions/sessionList'
import { useNavigate } from 'react-router-dom';
import PreviousSessionDetails from '../components/lastSession/PreviousSessionDetails';

export default function Homepage() {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar/> 
        <div className="container">

            <div className="content">
                <div className="quick-start">
                    <div className="banner">Quick Start</div>
                    <button className="start-button">Recovery</button>
                    <button className="start-button">Light</button>
                    <button className="start-button">Heavy</button>
                    <button className="start-button">Free Mode</button>
                    <button className="start-button">One Rep Max</button>
                    <button className="start-button">5 X 5</button>
                    <button className="start-button">Practice</button>
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
