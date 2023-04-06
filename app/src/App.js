//import './App.css';
import Login from './pages/login/login'
import Register from './pages/register/register'
import LiftSelection from './pages/lift/liftSelection'
import Squat from './pages/lift/squat'
import Homepage from './pages/homepage'
import History from './pages/lift/history'
import Session from './pages/lift/session'
import PasswordChange from './pages/accountRecovery/PasswordChange'
import ReCAPTCHA from "react-google-recaptcha";
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import SquatTut from './pages/tutorials/squat-tut'
import GraphTut from './pages/tutorials/graph-tut'
import CamerasTut from './pages/tutorials/cameras-tut'
import PasswordChangeTwo from './pages/accountRecovery/PasswordChange2'
import AccountSettings from './pages/accountRecovery/AccountSettings'

import{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  //reactrouter.com quick start
  const onChange = () => {
 
        const responseMessage = (response) => {
            console.log(response);
        };
        const errorMessage = (error) => {
            console.log(error);
        };
      
    
  };
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
        <Route path="/PasswordChange" element={<PasswordChange />}/>
        <Route path="/PasswordChange2" element={<PasswordChangeTwo />}/>
        <Route path="/squatTut" element={<SquatTut />}/>
        <Route path="/camerasTut" element={<CamerasTut />}/>
        <Route path="/graphTut" element={<GraphTut />}/>
        <Route path="/AccountSettings" element={<AccountSettings />}/>
        <Route path="/PasswordChange" element={<PasswordChange />}/>
        <Route path="/PasswordChangeTwo" element={<PasswordChangeTwo />}/>
      </Routes>
     </Router>
  );
}

export default App;
