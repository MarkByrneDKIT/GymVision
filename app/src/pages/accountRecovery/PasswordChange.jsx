import "./recovery.css"
import { useRef } from "react"
import { useNavigate} from 'react-router-dom';

export default function PasswordChange() {
    const answer = useRef();
    const newPassword = useRef();
    const navigate = useNavigate();
  
    
      return (
        <div className="container">
        <div className="wrapper fadeInDown">

        <div id="formContent">
            {/* Tabs Titles */}
            <h2 className="active"> Forgot Password </h2>
    
            {/* Forgot Pass Form*/}
            <form>
                <span>SECURITY QUESTION HERE</span>
                <input type="text" id="answer" className="fadeIn second" name="username" placeholder="Answer" ref={answer} required />
                <input type="submit" className="fadeIn fourth"  onClick={() => navigate('/PasswordChange2')} value="Submit Answer" />
            </form>
          </div>
        </div>
        </div>
      );
    };
                    

