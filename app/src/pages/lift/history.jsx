import {Button} from '@mui/material'
import Navbar from "../../components/Navbar/Navbar";

export default function History()   {

    return (
        
        <tbody>
          <Navbar/>
          {sessions.map(session => (
            <tr>{session}</tr>
          ))}
        </tbody>

    )
}



