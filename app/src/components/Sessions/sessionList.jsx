import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button} from '@mui/material';
import './sessionList.css'
import { AuthContext } from "../../context/AuthContext";
import {useContext} from "react"

function SessionList({ userId }) {
  const [sessions, setSessions] = useState([]);
  const {user} = useContext(AuthContext);
  const [session, setSession] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/sessions/session/${user.username}`);
      setSessions(response.data);
      console.log(response.data)
    }
    fetchData();
  }, [userId]);

  const handleSessionClick = (session) => {
///session/:username/:id"
    setSession(session);
    window.location.href = `sessions/session/${session.username}/${session._id}`;
  };

  return (
    <ul>
      {sessions.map((session) => (
        <Button variant="contained" className='sessionButtons' key={session.id} onClick={() => handleSessionClick(session)}>{session.createdAt}</Button>
      ))}
    </ul>
  );
}

export default SessionList;
