import Navbar from "../../components/Navbar/Navbar";
import SessionList from '../../components/Sessions/sessionList'
import Table from "../../components/Table/table"
import Footer from "../../components/Footer/Footer";

export default function History()   {

    return (
        
        <div className='container'>
          <Navbar/>
          <div>
            <SessionList/>
          </div>
    
      
            <Footer></Footer>
          </div>
 
    );
}