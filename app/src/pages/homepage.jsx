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
        <ul>
        {/*  <li class="scroll-to-section"><a href="/" class="active">Home</a></li>
         <li class="scroll-to-section"><a href="/graph/">Graph</a></li>
         <li class="scroll-to-section"><a href="/sessions/">History</a></li>
         <li class="scroll-to-section"><a href="/register">Register</a></li>
         <li class="scroll-to-section"><a href="/logout">Logout</a></li> */}
        
        <li><Link to="/deadlift">Deadlift</Link></li>
        <li><Link to="/squat">Squat</Link></li>
        <li><Link to="/shoulderpress">Shoulder Press</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        {/* <Link to="/liftselection">Deadlift</Link> */}
    </ul>
    </div>
     );
}