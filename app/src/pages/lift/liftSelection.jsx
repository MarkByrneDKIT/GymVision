import "./lift.css"
import { useRef } from "react"
import {loginCall} from "../../apiCalls"
import { useContext} from "react"
import { AuthContext } from "../../context/AuthContext";
 

export default function LiftSelection() {

    return(
    
        <div>
                <h1 className="loginLogo">SetStats</h1>    
                <h2 className="PickLift">Choose your lift</h2>  
            <button>Deadlift</button>
            <button>Squat</button>
            <button>Shoulder Press</button>
            <button2>View Lift History</button2>
        </div>

    );
}