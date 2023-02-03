import { useRef } from "react"
import './homepage.css'
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar'

export default function Homepage() {
    return (
        <div className="container">
            <Navbar/> 
            <button id="buttonOne"><a href='/liftSelection'>Select Lift</a></button>
            <button id="buttonTwo"><a>Profile</a></button>
            <button id="buttonThree"><a href='/history'>History</a></button>
            <button id="buttonFour"><a>Gym Buddies</a></button>
            <div id="boxOne">Contact Us</div>
            <div id="boxTwo">Info</div>
            <div id="boxThree">Friends Online</div>
            <div id="boxFour">Last Session</div>
            <div id="boxFive">Box 5</div>
            <div id="boxSix">Box 6</div>
        </div>
     );
}