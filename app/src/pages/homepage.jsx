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
            <div id="boxOne">Box 1</div>
            <div id="boxTwo">Box 2</div>
            <div id="boxThree">Box 3</div>
        </div>
     );
}