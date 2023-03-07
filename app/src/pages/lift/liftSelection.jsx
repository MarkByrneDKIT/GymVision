import "./lift.css"
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/footer";

export default function LiftSelection() {

    return (
        <div className="container">
            <Navbar/>
            <h2 className="PickLift">Choose your lift</h2>
            <a href='/squat' className="button">Squat</a>
            <a href='/squat' className="button">Deadlift</a>
            <a href='/squat' className="button">Shoulder Press</a>
           
        </div>
    );
}