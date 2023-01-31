import {Button} from '@mui/material'
import Navbar from "../../components/Navbar/Navbar";
import SessionList from '../../components/sessionList'

export default function History()   {

    return (
        
        <tbody>
          <Navbar/>
          <div>
          <SessionList userId="liam" />
          </div>
        </tbody>

    )
}



