import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import PubNub from 'pubnub';
import { AuthContext } from '../../context/AuthContext';
import './lift.css';

export default function Squat() {
  const { user } = useContext(AuthContext);

  const pubnub = new PubNub({
    subscribeKey: 'sub-c-66e361b6-c13c-411e-a780-9b16fc2e0c36',
    publishKey: 'pub-c-d8d5b759-3b66-4d5b-ae7d-b119cc474e80',
    userId: 'liamdenningsetstats',
  });

  const [status, setStatus] = useState('off');
  const [flash, setFlash] = useState(false);
  const [imageCapture, setImageCapture] = useState(false);


  const handleClick = async (e) => {
    e.preventDefault();
    if (status === 'off') {
      setStatus('on');
      pubnub.publish(
        {
          channel: 'Setstats',
          message: { status: 'on', username: user.username },
        },
        function (status, response) {
          console.log(status);
          console.log(response);
        },
      );
    } else if (status === 'on') {
      setStatus('off');
      pubnub.publish(
        {
          channel: 'Setstats',
          message: { status: 'off' },
        },
        function (status, response) {
          console.log(status);
          console.log(response);
        },
      );

      const session = {
        username: 'liam',
        repCount: document.getElementById('r').innerHTML,
        setCount: document.getElementById('s').innerHTML,
      };

      axios.post('/sessions/session', session);
    }
  };

  useEffect(() => {
    if (status === 'on') {
      const interval = setInterval(() => {
        axios.get('https://e91e-109-78-162-60.eu.ngrok.io').then(function (response) {
          console.log(response.data);
          var rep = response.data['Rep'];
          document.getElementById('r').textContent = rep;
          var set = response.data['Set'];
          document.getElementById('s').textContent = set;
          var feedback = response.data['Feedback'];
          document.getElementById('knees').textContent = feedback.Knee;
          document.getElementById('shoulders').textContent = feedback.Shoulder;
          document.getElementById('tilt').textContent = feedback.tilt;
          setFlash(true);
          setTimeout(() => setFlash(false), 1000);
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleImageCaptureToggle = (e) => {
    setImageCapture(e.target.checked);
  };
  

  return (
    <div className="container">
      <Navbar />
      <div className="data-container">
        <div className={`data-box ${flash ? 'flash' : ''}`}>
          <p>
            Reps: <span id="r"></span>
          </p>
        </div>
        <div className={`data-box ${flash ? 'flash' : ''}`}>
          <p>
            Set: <span id="s"></span>
          </p>
        </div>
        <div className={`data-box ${flash ? 'flash' : ''}`}>
          <p>
            Shoulders: <span id="shoulders"></span>
          </p>
        </div>
        <div className={`data-box ${flash ? 'flash' : ''}`}>
          <p>
            Knees: <span id="knees"></span>
          </p>
        </div>
        <div className={`data-box ${flash ? 'flash' : ''}`}>
          <p>
            Tilt: <span id="tilt"></span>
          </p>
        </div>
      </div>

      <form className="buttonForm" onSubmit={handleClick}>
        <button
          type="submit"
          id="dataButton"
          style={{
            backgroundColor: status === 'off' ? 'green' : 'red',
          }}
        >
          {status === 'off' ? 'Start' : 'Stop'} data
        </button>
        <input type="checkbox" id="lifting" onChange={handleImageCaptureToggle} />
      </form>

    </div>
  );
}