import {Button} from '@mui/material'
import Navbar from "../../components/Navbar/Navbar";
import SessionList from '../../components/Sessions/sessionList'
import Table from "../../components/Table/table"

export default function History()   {

    return (
        
        <div className='container'>
          <Navbar/>
    
          <div>
          <SessionList />
          </div>
          <Table/>
        </div>

    );
}