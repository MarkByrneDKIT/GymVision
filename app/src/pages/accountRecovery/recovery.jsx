import "./recovery.css"
import { useRef } from "react"
import Navbar from '../../components/Navbar/Navbar'

export default function Recovery() {
    const email = useRef();
  
    
      return (
        <div className="container"> 
            <Navbar/>
        <div className="wrapper fadeInDown">

          <div id="formContent">
            {/* Tabs Titles */}
            <h2 className="active"> Forgot Password </h2>
    
    
            {/* Forgot Pass Form*/}
            <form>
              <input type="text" id="login" className="fadeIn second" name="username" placeholder="Email" ref={email} required />
              <input type="submit" className="fadeIn fourth" value="Send Reset Code" />
            </form>
          </div>
        </div>
        </div>
      );
    };
                    

