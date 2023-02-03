import "./lift.css"
import { useRef } from "react"
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import React, { useState, useEffect } from 'react';
import PubNub from 'pubnub';

export default function Squat() {
  const pubnub = new PubNub({
    subscribeKey: 'sub-c-66e361b6-c13c-411e-a780-9b16fc2e0c36',
    publishKey: 'pub-c-d8d5b759-3b66-4d5b-ae7d-b119cc474e80',
    userId: 'liamdenningsetstats',
});

const [status, setStatus] = useState('off');

const [text, setButtonText] = useState("Start");

const changeText = (text) =>{
  if (text === "Start"){
    setButtonText("Stop")
  }
  else{
    setButtonText("Start")
  }
}

const handleClick = async (e) =>{
  e.preventDefault();
    if (status === 'off') {
        setStatus('on');
        pubnub.publish(
          {
            channel: "Setstats",
            message: {"status": "on"}
          },
          function(status, response) {
            console.log(status);
            console.log(response);
          }
        );
      }
      // If the status is "on", set it to "off"
      else if (status === 'on') {
        setStatus('off');
        pubnub.publish(
          {
            channel: "Setstats",
            message: {"status": "off"}
          },
          function(status, response) {
            console.log(status);
            console.log(response);
          }
        );

        const session = {
          username: "liam",
          repCount: document.getElementById("r").innerHTML,
          setCount: document.getElementById("s").innerHTML,
          feedback: document.getElementById("f").innerHTML
        };

        axios.post("/sessions/session", session);
      }
}

    useEffect(() => {

        if (status === 'on') {

          const interval = setInterval(() => {
            console.log("a");
            axios
            .get("http://localhost:5000/")
            .then( function(response){
              console.log(response.data)
              var rep =response.data["Rep"]
              document.getElementById("r").textContent= rep;
              var set =response.data["Set"]
              document.getElementById("s").textContent= set;
              var feedback =response.data.Feedback["Shoulder"]
              document.getElementById("shoulders").textContent= feedback;
              var feedback =response.data.Feedback["Knee"]
              document.getElementById("knees").textContent= feedback;
              var feedback =response.data.Feedback["tilt"]
              document.getElementById("tilt").textContent= feedback;}
            )
            //set time between requests
          }, 300);
          return () => clearInterval(interval);
        }
      }, [status]);
    return(
                <div>
                  <Navbar/> 
				        <h1>Rep: <span id="r"></span></h1>
				        <h1>Set: <span id="s"></span></h1>
                <h1>Feedback: </h1>
                <h3> <span id="shoulders"/></h3>
                <h3> <span id="knees"/></h3>
                <h3> <span id="tilt"/></h3>
                <form onSubmit={handleClick}>
                <button type="submit" className="startButton" onClick={() => changeText(text)}>{text}</button>
                <input type="checkbox" id="lifting"/>
                {/* <input type="checkbox" checked={checked} onChange={handleChange} /> */}
                </form>
                </div>
    );
}