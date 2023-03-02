import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar'
import ErrorImage from '../../components/ErrorImages/errorImages';
import './session.css'

function Session() {
  const { state } = useLocation();
  const selectedSession = state.selectedSession;
  console.log(state.selectedSession);

  return (
    <div>
      <Navbar/>
      <ErrorImage/>
      <div className="rowOne">

            <card id="repsCard">
              <p>Rep Count:</p>
              <p id="nums">{selectedSession.repCount}</p>
            </card>

            <card id="setsCard">
              <p className='titles'>Set Count: </p>
              <p classname='nums'>{selectedSession.setCount}</p>
            </card>

            <card id="errorsNumCard">
              <p className='titles'>Total Errors</p>
              <p classname='nums'></p>
            </card>

            <card id="totalWeightCard">
              <p className='titles'>Total Weight Lifted</p>
              <p classname='nums'></p>
            </card>

            <card id="timeCard">
              <p className='titles'>Time</p>
              <p classname='nums'></p>
            </card>

            <card id="worstSetCard">
            <p className='titles'>Worst Set</p>
              <p classname='nums'></p>
            </card>

            <card id="bestSetCard">
            <p className='titles'>Best Set</p>
              <p classname='nums'></p>
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


