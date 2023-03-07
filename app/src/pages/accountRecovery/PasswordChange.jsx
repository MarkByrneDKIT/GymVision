import "./recovery.css"
import { useRef } from "react"
import Navbar from '../../components/Navbar/Navbar'

export default function PasswordChange() {
    const passCode = useRef();
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
                <input type="text" id="login" className="fadeIn second" name="username" placeholder="CODE" ref={passCode} required />
                <input type="text" id="login" className="fadeIn second" name="username" placeholder="New Password" ref={newPassword} required />
                <input type="text" id="login" className="fadeIn second" name="username" placeholder="Confrim Password" ref={newPassword} required />
                <input type="submit" className="fadeIn fourth" value="Reset Password" />
            </form>
          </div>
        </div>
        </div>
      );
    };
                    

