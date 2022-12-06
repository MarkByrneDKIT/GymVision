import "./lift.css"
import { useRef } from "react"
import axios from "axios";
import { useNavigate } from "react-router";

export default function Squat() {
    const handleClick = async (e) => {
        e.preventDefault();
          axios
          .get("http://localhost:5000")
          .then( function(response){
            console.log(response.data)
            var rep =response.data["Rep"]
            document.getElementById("r").textContent= rep;
            var set =response.data["Set"]
            document.getElementById("s").textContent= set;}
          )
        
      }
      function continuousGet(){

      }
    return(
                <div>
				        <h1>Rep:<span id="r"></span></h1>
				        <h1>Set:<span id="s"></span></h1>
                <form onSubmit={handleClick}>
                <button type="submit">Get data</button>
                <input type="checkbox" id="lifting"/>
                </form>
                </div>
    );
}