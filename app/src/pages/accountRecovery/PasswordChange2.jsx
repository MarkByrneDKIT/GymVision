import "./recovery.css"
import { useRef } from "react"

export default function PasswordChangeTwo() {
    const newPassword = useRef();
    const confirmPassword = useRef();
  
    
      return (
        <div className="container">
        <div className="wrapper fadeInDown">

        <div id="formContent">
            {/* Tabs Titles */}
            <h2 className="active"> Forgot Password </h2>
    
 
    
            {/* Forgot Pass Form*/}
            <form>
                <input type="text" id="password" className="fadeIn second" name="username" placeholder="New Password" ref={newPassword} required />
                <input type="text" id="password" className="fadeIn second" name="username" placeholder="Confirm Password" ref={confirmPassword} required />
                <input type="submit" className="fadeIn fourth" value="Reset Password" />
            </form>
          </div>
        </div>
        </div>
      );
    };
                    

