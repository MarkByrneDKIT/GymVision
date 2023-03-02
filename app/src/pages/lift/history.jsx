import {Button} from '@mui/material'
import Navbar from "../../components/Navbar/Navbar";
import SessionList from '../../components/Sessions/sessionList'
import Table from "../../components/Table/table"
import Footer from "../../components/footer/footer";

export default function History()   {

    return (
        
        <div className='container'>
          <Navbar/>
    
          <div>
          <SessionList />
          </div>
          <Table/>
          <Footer/>  
        </div>

    );
}