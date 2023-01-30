import "./lift.css"
import { useRef } from "react"
import { loginCall } from "../../apiCalls"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";


export default function LiftSelection() {

    return (

        <div>
            <Navbar/>
            <h1 className="loginLogo">SetStats</h1>
            <h2 className="PickLift">Choose your lift</h2>
            <a href='/squat' className="button">Squat</a>
            <button href='/squat' className="button">Deadlift</button>
            <button href='/squat' className="button">Shoulder Press</button>
        </div>

    );
}