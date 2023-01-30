import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SessionList({ userId }) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`https://your-api.com/sessions/${userId}`);
      setSessions(response.data);
    }
    fetchData();
  }, [userId]);

  return (
    <ul>
      {sessions.map((session) => (
        <Session key={session.id} session={session} />
      ))}
    </ul>
  );
}