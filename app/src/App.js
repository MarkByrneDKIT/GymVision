//import './App.css';
import Login from './pages/login/login'
import Register from './pages/register/register'
import LiftSelection from './pages/lift/liftSelection'
import Squat from './pages/lift/squat'
import Homepage from './pages/homepage'
import History from './pages/lift/history'
import Session from './pages/lift/session'
import Recovery from './pages/accountRecovery/recovery'
import PasswordChange from './pages/accountRecovery/PasswordChange'


import{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  //reactrouter.com quick start
  return(
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/liftSelection" element={<LiftSelection />}/>
        <Route path="/squat" element={<Squat />}/>
        <Route path="/" element={<Homepage />}/>
        <Route path="/history" element={<History />}/>
        <Route path="/session" element={<Session />}/>
        <Route path="/recovery" element={<Recovery />}/>
        <Route path="/PasswordChange" element={<PasswordChange />}/>
      </Routes>
     </Router>
  );
}

export default App;
