import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button} from '@mui/material';
import './sessionList.css'
import { AuthContext } from "../../context/AuthContext";
import {useContext} from "react"

function SessionList({ userId }) {
  const [sessions, setSessions] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/sessions/session/${user.username}`);
      setSessions(response.data);
      console.log(response.data)
    }
    fetchData();
  }, [userId]);

  return (
    <ul>
      {sessions.map((session) => (
        // <Session key={session.id} session={session} />
        <Button variant="contained" className='sessionButtons'>{session.createdAt}</Button>
      ))}
    </ul>
  );
}

export default SessionList;