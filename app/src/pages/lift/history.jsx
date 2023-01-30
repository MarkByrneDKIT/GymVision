import {Button} from '@mui/material'
import Navbar from "../../components/Navbar/Navbar";

export default function History()   {

    const sessions = []

    for(let i = 0; i < 3; i++)
        {
        sessions.push(<Button variant="contained">Contained</Button>)
        }

    return (
        
        <tbody>
          <Navbar/>
          {sessions.map(session => (
            <tr>{session}</tr>
          ))}
        </tbody>

    )
}



