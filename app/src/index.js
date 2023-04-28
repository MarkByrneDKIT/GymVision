import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
