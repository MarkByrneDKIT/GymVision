import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";
import './PreviousSessionDetails.css';

function PreviousSessionDetails() {
  const [latestSession, setLatestSession] = useState(null);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/sessions/session/${user.username}`);
      if (response.data.length > 0) {
        setLatestSession(response.data[0]);
      }
    }
    fetchData();
  }, [user]);

  if (!latestSession) {
    return <p>No previous sessions found.</p>;
  }

  // Convert the date to the desired format
  const dateOfSession = new Date(latestSession.createdAt).toLocaleDateString("en-CA");

  return (
    <div>
      <h3>Previous Session Details</h3>
      <p>Date of Session: {dateOfSession}</p>
      <p>Rep Count: {latestSession.repCount}</p>
      <p>Set Count: {latestSession.setCount}</p>
      {/* Add more details about the session */}
    </div>
  );
}

export default PreviousSessionDetails;