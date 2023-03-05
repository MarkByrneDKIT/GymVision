import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button} from '@mui/material';
import './sessionList.css'
import { AuthContext } from "../../context/AuthContext";
import {useContext} from "react"
import { useNavigate } from "react-router";

function SessionList({ userId }) {
  const [sessions, setSessions] = useState([]);
  const {user} = useContext(AuthContext);
  const [selectedSession, setSelectedSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/sessions/session/${user.username}`);
      setSessions(response.data);
      console.log(response.data)
    }
    fetchData();
  }, [userId]);

  const handleSessionClick = (session) => {
    setSelectedSession(() => session);
  };
  

  useEffect(() => {
    console.log(selectedSession)
    if (selectedSession) {
      navigate("/session", {state: {selectedSession}});
    }
  });
  
  

  return (
    <ul>
      {sessions.map((session) => (
        <Button variant="contained" className='sessionButtons' key={session.id} onClick={() => handleSessionClick(session)}>{session.createdAt}</Button>
      ))}
    </ul>
  );
}

export default SessionList;