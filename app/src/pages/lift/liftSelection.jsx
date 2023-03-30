import "./lift.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/footer";
import { useNavigate } from "react-router-dom";

export default function LiftSelection() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <Navbar />
      <div className="content">
        <div className="lift-selection">
          <div className="banner">Choose Your Lift</div>
          <button className="start-button" onClick={() => navigate("/squat")}>Squat</button>
          <button className="start-button" onClick={() => navigate("/deadlift")}>Recovery</button>
          <button className="start-button" onClick={() => navigate("/shoulderPress")}>Light</button>
          <button className="start-button" onClick={() => navigate("/squat")}>Heavy</button>
          <button className="start-button" onClick={() => navigate("/deadlift")}>5 X 5</button>
          <button className="start-button" onClick={() => navigate("/deadlift")}>One Rep Max</button>
          <button className="start-button" onClick={() => navigate("/shoulderPress")}>Practice</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}