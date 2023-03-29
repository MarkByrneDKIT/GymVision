import './homepage.css'
import Navbar from '../components/Navbar/Navbar'
import Footer from "../components/footer/footer";
import SessionList from '../components/Sessions/sessionList'
import { useNavigate } from 'react-router-dom';
import PreviousSessionDetails from '../components/lastSession/PreviousSessionDetails';

export default function Homepage() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <Navbar/> 
            <div className="content">
                <div className="contact-form">
                    <div className="banner">Tutorials</div>
                    <button className="start-button">How to Squat</button>
                    <button className="start-button">How to Read SetStats Graph</button>
                    <button className="start-button">How to Setup Cameras</button>
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
                <div className="quick-start">
                    <div className="banner">Quick Start</div>
                    <button className="start-button">Recovery</button>
                    <button className="start-button">Light</button>
                    <button className="start-button">Heavy</button>
                </div>
            </div>
            <Footer></Footer>
        </div>
     );
}
