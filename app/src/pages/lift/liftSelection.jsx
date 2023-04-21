import "./lift.css";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

export default function LiftSelection() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
    <div className="container">
      <div className="content">
        <div className="lift-selection">
          <button className="start-button" onClick={() => navigate("/squat")}>Squat</button>
          <button className="start-button" onClick={() => navigate("/deadlift")}>Recovery</button>
          <button className="start-button" onClick={() => navigate("/shoulderPress")}>Light</button>
          <button className="start-button" onClick={() => navigate("/squat")}>Heavy</button>
          <button className="start-button" onClick={() => navigate("/deadlift")}>5 X 5</button>
          <button className="start-button" onClick={() => navigate("/deadlift")}>One Rep Max</button>
          <button className="start-button" onClick={() => navigate("/shoulderPress")}>Practice</button>
        </div>
      </div>
    </div>
    </div>
  );
}