import "./lift.css"
import { useRef } from "react"
import axios from "axios";
import { useNavigate } from "react-router";
import React, { useState, useEffect } from 'react';

export default function ShoulderPress() {




    const [status, setStatus] = useState('off');
      
    const handleClick = async (e) =>{
      e.preventDefault();
        if (status === 'off') {
            setStatus('on');
          }
          // If the status is "on", set it to "off"
          else if (status === 'on') {
            setStatus('off');
          }
    }

        // const [checked, setChecked] = useState(false);
        // const handleChange = (event) => {
        //     setChecked(event.target.checked);

        //   }

        useEffect(() => {

            if (status === 'on') {
                
              const interval = setInterval(() => {
                console.log("a");
                axios
                .get("https://fd8b-193-1-45-253.eu.ngrok.io")
                .then( function(response){
                  console.log(response.data)
                  var rep =response.data["Rep"]
                  document.getElementById("r").textContent= rep;
                  var set =response.data["Set"]
                  document.getElementById("s").textContent= set;}
                )
                //set time between requests
              }, 300);
              return () => clearInterval(interval);
            }
          }, [status]);
      
    return(
                <div>
				        <h1>Rep:<span id="r"></span></h1>
				        <h1>Set:<span id="s"></span></h1>
                <form onSubmit={handleClick}>
                <button type="submit">Get data</button>
                <input type="checkbox" id="lifting"/>
                {/* <input type="checkbox" checked={checked} onChange={handleChange} /> */}
                </form>
                </div>
    );
}