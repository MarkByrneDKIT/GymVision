import "./lift.css"
import { useRef } from "react"
import axios from "axios";
import { useNavigate } from "react-router";
import React, { useState, useEffect } from 'react';
import PubNub from 'pubnub';
//import { PubNubProvider, usePubNub } from 'pubnub-react';

export default function Squat() {


      const pubnub = new PubNub({
        subscribeKey: 'sub-c-66e361b6-c13c-411e-a780-9b16fc2e0c36',
        publishKey: 'pub-c-d8d5b759-3b66-4d5b-ae7d-b119cc474e80',
        userId: 'liamdenningsetstats',
    });

    const [status, setStatus] = useState('off');
      
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
              setCount: document.getElementById("s").innerHTML
            };

            axios.post("/sessions/session", session);
          }
    }

        useEffect(() => {

            if (status === 'on') {
                
              const interval = setInterval(() => {
                console.log("a");
                axios
                .get("https://e91e-109-78-162-60.eu.ngrok.io")
                .then( function(response){
                  console.log(response.data)
                  var rep =response.data["Rep"]
                  document.getElementById("r").textContent= rep;
                  var set =response.data["Set"]
                  document.getElementById("s").textContent= set;
                  var feedback =response.data["Feedback"]
                  document.getElementById("knees").textContent= feedback.Knee;
                  document.getElementById("shoulders").textContent= feedback.Shoulder;
                  document.getElementById("tilt").textContent= feedback.tilt;}
                )
                //set time between requests
              }, 3000);
              return () => clearInterval(interval);
            }
          }, [status]);
      
    return(
                <div>
				        <h1>Rep:<span id="r"></span></h1>
				        <h1>Set:<span id="s"></span></h1>
                <h1>Feedback:</h1>
                <h1> <span id="shoulders"></span></h1>
                <h1> <span id="knees"></span></h1>
                <h1> <span id="tilt"></span></h1>
                <form onSubmit={handleClick}>
                <button type="submit">Get data</button>
                <input type="checkbox" id="lifting"/>
                {/* <input type="checkbox" checked={checked} onChange={handleChange} /> */}
                </form>
                </div>
    );
}