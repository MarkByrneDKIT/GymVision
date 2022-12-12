//import './App.css';
import Login from './pages/loginRegister/login'
import Register from './pages/loginRegister/register'
import LiftSelection from './pages/lift/liftSelection'
import Squat from './pages/lift/squat'
import Deadlift from './pages/lift/deadlift'
import Homepage from './pages/homepage'
import ShoulderPress from './pages/lift/shoulderPress'

import{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ShoulderPress from './pages/lift/shoulderPress'

function App() {
  //reactrouter.com quick start
  return(
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/liftSelection" element={<LiftSelection />}/>
        <Route path="/deadlift" element={<Deadlift />}/>
        <Route path="/squat" element={<Squat />}/>
        <Route path="/home" element={<Homepage />}/>
        <Route path="/shoulderpress" element={<ShoulderPress />}/>
      </Routes>
     </Router>
  );
}

export default App;
