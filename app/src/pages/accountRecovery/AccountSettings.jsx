import "./recovery.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

export default function AccountSettings() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [sliderChecked, setSliderChecked] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    const confirmation = window.confirm("Are you sure you want to delete your account?");

    if (!confirmation) {
      return;
    }

    const usern = {
      userId: user._id,
    };
    try {
      await axios.delete("/users/" + user._id, { data: usern });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSliderChange = (e) => {
    setSliderChecked(e.target.checked);
    if (e.target.checked) {
      console.log("slider checked");
    }
    else(console.log("slider unchecked"));
  };

  const handleResetPasswordClick = () => {
    navigate("/PasswordChange");
  };

  return (
    <div>
      <Navbar />
    <div className="container">
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 className="active">Delete Account</h2>
          <form>
            <input type="button" className="fadeIn fourth" value="Delete Account" onClick={handleClick} />
          </form>
        </div>
      </div>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 className="active">Reset Password</h2>
          <form>
            <input type="button" className="fadeIn fourth" value="Reset Password" onClick={handleResetPasswordClick} />
          </form>
        </div>
      </div>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 className="active">Error Image Capture</h2>
          <form>
            <label className="switch fadeIn fourth">
              <input type="checkbox" checked={sliderChecked} onChange={handleSliderChange} />
              <span className="slider round"></span>
            </label>
            <p className="toggle-label fadeIn fourth">No / Yes</p>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}