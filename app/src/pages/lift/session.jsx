import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar'
import ErrorImage from '../../components/ErrorImages/errorImages';
import './session.css'

function Session() {
  const { state } = useLocation();
  const selectedSession = state.selectedSession;
  console.log(state.selectedSession);

  return (
    <div className='container'>
      <Navbar/>
      <p>DATE OF SESSION HERE</p>
      <ErrorImage/>
      <div className="rowOne">

            <card id="repsCard">
              <p className='titles'>Rep Count:</p>
              <p id='nums'>{selectedSession.repCount}</p>
            </card>

            <card id="setsCard">
              <p className='titles'>Set Count: </p>
              <p id='nums'>{selectedSession.setCount}</p>
            </card>

            <card id="errorsNumCard">
              <p className='titles'>Total Errors</p>
              <p id='nums'>7</p>
            </card>

            <card id="totalWeightCard">
              <p className='titles'>Total Weight Lifted</p>
              <p id='nums'>200</p>
            </card>

            <card id="timeCard">
              <p className='titles'>Time</p>
              <p id='nums'>5:04</p>
            </card>

            <card id="worstSetCard">
            <p className='titles'>Worst Set</p>
              <p id='nums'>3</p>
            </card>

            <card id="bestSetCard">
            <p className='titles'>Best Set</p>
              <p id='nums'>1</p>
            </card>

            <card id="bestRepCard">
            <p className='titles'>Best Rep</p>
            <p id='nums'>7</p>
            </card>

          </div>
    </div>
  );
}

export default Session;


