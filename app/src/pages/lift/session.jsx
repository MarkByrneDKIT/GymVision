import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

function Session() {
  const { state } = useLocation();
  const selectedSession = state.selectedSession;
  console.log(state.selectedSession);

  return (
    <div>
      <h1>Session Information</h1>
      <p>Username: {selectedSession.username}</p>
      <p>Rep Count: {selectedSession.repCount}</p>
      <p>Set Count: {selectedSession.setCount}</p>
    </div>
  );
}

export default Session;


