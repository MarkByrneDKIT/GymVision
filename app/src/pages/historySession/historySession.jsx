import {Button} from '@mui/material'
import ErrorImage from '../../components/ErrorImages/errorImages';
import Navbar from "../../components/Navbar/Navbar";
import './historySession.css'

export default function HistorySession()   {

    return (        
        <div>
          <Navbar/>
          <ErrorImage/>
          <div className="rowOne">
            <card id="repsCard">Reps</card>
            <card id="setsCard">Sets</card>
            <card id="errorsNumCard"># of Errors</card>
            <card id="totalWeightCard">Total Weight Lifted</card>
            <card id="timeCard">Time</card>
            <card id="worstSetCard">Worst Set</card>
            <card id="bestSetCard">Best Set</card>
            <card id="bestRepCard">Best Rep</card>
          </div>
        </div>
    )
}