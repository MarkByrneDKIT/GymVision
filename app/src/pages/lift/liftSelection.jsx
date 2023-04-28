import "./lift.css";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import PubNub from 'pubnub';

export default function LiftSelection() {
      const navigate = useNavigate();

    const pubnub = new PubNub({
        subscribeKey: 'sub-c-66e361b6-c13c-411e-a780-9b16fc2e0c36',
        publishKey: 'pub-c-d8d5b759-3b66-4d5b-ae7d-b119cc474e80',
        userId: 'liamdenningsetstats',
      });

      const handleClick = async (e, rep, set) => {
          pubnub.publish(
            {
              channel: 'Setstats',
              message: { reps: rep, sets: set},
            },
            function (status, response) {
              console.log(status);
              console.log(response);
            },
          );
          navigate('/squat');
      };

  return (
    <div>
      <Navbar />
    <div className="container">
      <div className="content">
        <div className="lift-selection">
        <div className="banner">Quick Start</div>
            <button className="start-button" onClick={event => handleClick(event,3,3)}>Heavy</button>
            <button className="start-button" onClick={event => handleClick(event, 12,3)}>Light</button>
            <button className="start-button" onClick={event => handleClick(event, 6,3)}>Muscle Gain</button>
            <button className="start-button" onClick={event => handleClick(event, 5,5)} >5 x 5</button>
            <button className="start-button" onClick={event => handleClick(event, 1000, 2)}>Practice</button>
        </div>
      </div>
    </div>
    </div>
  );
}