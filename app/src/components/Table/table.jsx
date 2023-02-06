import React from 'react'
import './table.css'
  
export default function Table() {
  return (
    <div className="Table">
      <table>
        <tr>
          <th>Name</th>
          <th>LiftType</th>
          <th>Reps</th>
        </tr>
        <tr>
          <td>John</td>
          <td>Squat</td>
          <td>4</td>
        </tr>
        <tr>
          <td>Aaron</td>
          <td>DeadLift</td>
          <td>3</td>
        </tr>
        <tr>
          <td>Sarah</td>
          <td>Shoulder Press</td>
          <td>6</td>
        </tr>
      </table>
    </div>
  );
}
 