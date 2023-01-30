import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button} from '@mui/material'

function SessionList({ userId }) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/sessions/session/${userId}`);
      setSessions(response.data);
      console.log(response.data)
    }
    fetchData();
  }, [userId]);

  return (
    <ul>
      {sessions.map((session) => (
        // <Session key={session.id} session={session} />
        <Button variant="contained">{session.createdAt}</Button>
      ))}
    </ul>
  );
}

export default SessionList;