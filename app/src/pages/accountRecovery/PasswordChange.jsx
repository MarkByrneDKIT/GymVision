import "./recovery.css"
import { useRef } from "react"
import Navbar from '../../components/Navbar/Navbar'

export default function PasswordChange() {
    const answer = useRef();
    const newPassword = useRef();
  
    
      return (
        <div className="container">
             <Navbar/>
        <div className="wrapper fadeInDown">

        <div id="formContent">
            {/* Tabs Titles */}
            <h2 className="active"> Forgot Password </h2>
    
 
    
            {/* Forgot Pass Form*/}
            <form>
                <span>SECURITY QUESTION HERE</span>
                <input type="text" id="answer" className="fadeIn second" name="username" placeholder="Answer" ref={answer} required />
                <input type="submit" className="fadeIn fourth" value="Reset Password" />
            </form>
          </div>
        </div>
        </div>
      );
    };
                    

