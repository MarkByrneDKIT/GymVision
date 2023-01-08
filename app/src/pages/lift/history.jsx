import {Button} from '@mui/material'

export default function History()   {

    const sessions = []

    for(let i = 0; i < 3; i++)
        {
        sessions.push(<Button variant="contained">Contained</Button>)
        }

    return (
        
        <tbody>
          {sessions.map(session => (
            <tr>{session}</tr>
          ))}
        </tbody>

    )
}



