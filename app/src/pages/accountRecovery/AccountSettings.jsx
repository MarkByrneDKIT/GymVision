import "./recovery.css"
import { useRef } from "react"
import { useNavigate} from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import axios from 'axios';


export default function AccountSettings() {
    const answer = useRef();
    const newPassword = useRef();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    

    const handleClick = async (e) => {
        e.preventDefault();
         {
          const usern = {
            username: user.username
          };
          try {
            await axios.delete("/users/"+user.id_, usern);
            navigate("/");
          } catch (err) {
            console.log(err);
          }
        }
      };
    
      return (
        <div className="container">
        <div className="wrapper fadeInDown">

        <div id="formContent">
    
            {/* Forgot Pass Form*/}
            <form>
                <span>Account Deletion</span>
                <input type="submit" className="fadeIn fourth"  onClick={handleClick} />
            </form>
          </div>
        </div>
        </div>
      );
    };
                    

