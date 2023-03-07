import './homepage.css'
import Navbar from '../components/Navbar/Navbar'
import ContactForm from "../components/contactForm/contactForm";
import Footer from "../components/footer/footer";
import SessionList from '../components/Sessions/sessionList'

export default function Homepage() {
    return (
        <div className="container">
            <Navbar/> 
            {/* Quick Session (recovery, lightWeight, HeavyWeights) */}
            <div id="boxOne">
                <p id="chooseLiftText">Choose your lift</p>
                <button id="button1"><a id="buttonText" href='/squat'>Squat</a></button>
                <button id="button2"><a id="buttonText" href='/squat'>Deadlift</a></button>
                <button id="button3"><a id="buttonText" href='/squat'>Shoulder Press</a></button>
            </div>
            {/* Contact Form */}
            <div id="boxTwo">
                <ContactForm/>
            </div>
             {/* Previous Sessions */}
            <div id="boxThree">
            <p id="chooseLiftText">Previous Sessions</p>
                <div id="sessionContainer">
                    <SessionList/>
                </div>
            </div>
            {/* Previous Session Details*/}
            <div id="boxFour">
                <p id="chooseLiftText">Previous Session Details</p>
                <p>Date of Session:  </p>
                <p>Reps: </p>
                <p>Sets: </p>
                <p>Worst Set: </p>
                <p>Best Set: </p>
                <p>Total Errors: </p>
            </div>
            {/*  */}
            <div id="boxFive">
                <p id="chooseLiftText">Quick Start</p>
                <button id="button1"><a id="buttonText">Recovery</a></button>
                <button id="button2"><a id="buttonText">Light</a></button>
                <button id="button3"><a id="buttonText">Heavy</a></button>
            </div>
            {/*  */}
            <div id="boxSix">
                Box 6
            </div>
            <Footer></Footer>
        </div>
     );
}