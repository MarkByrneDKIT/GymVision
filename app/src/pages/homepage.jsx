import { useRef } from "react"
import './homepage.css'
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar'
import ContactForm from "../components/contactForm/contactForm";
import Footer from "../components/footer/footer";

export default function Homepage() {
    return (
        <div className="container">
            <Navbar/> 
            <button id="buttonOne"><a href='/liftSelection'>Select Lift</a></button>
            <button id="buttonTwo"><a href='/profile'>Profile</a></button>
            <button id="buttonThree"><a href='/history'>History</a></button>
            <button id="buttonFour"><a href='/login'>Sign Out</a></button>
            <div id="boxOne">
                <p>Chart comparing your friends total sessions each month to yours</p>

            </div>
            <div id="boxTwo">
                <ContactForm/>
            </div>
            <div id="boxThree">
                <p>Friends Online</p>
                <ul id='friend-list'>
                    <li class='friend'>
                        <img src='https://i.imgur.com/nkN3Mv0.jpg' />
                        <div class='name'>Andres Perez</div>
                    </li>
                    <li class='friend'>
                        <img src='https://i.imgur.com/0I4lkh9.jpg' />
                        <div class='name'>Leah Slaten</div>
                    </li>
                    <li class='friend'>
                        <img src='https://i.imgur.com/s2WCwH2.jpg' />
                        <div class='name'>Mario Martinez</div>
                    </li>
                    <li class='friend'>
                        <img src='https://i.imgur.com/rxBwsBB.jpg' />
                        <div class='name'>Cynthia Lo</div>
                    </li>
                    <li class='friend'>
                        <img src='https://i.imgur.com/tovkOg2.jpg' />
                        <div class='name'>Sally Lin</div>
                    </li>
                    <li class='friend'>
                        <img src='https://i.imgur.com/A7lNstm.jpg' />
                        <div class='name'>Danny Tang</div>
                    </li>
                </ul>

            </div>
            <div id="boxFour">
                Last Session
            </div>
            <div id="boxFive">
                Box 5
            </div>
            <div id="boxSix">
                Box 6
            </div>
            <Footer/>  
        </div>
     );
}