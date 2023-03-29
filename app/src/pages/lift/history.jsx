import Navbar from "../../components/Navbar/Navbar";
import SessionList from '../../components/Sessions/sessionList'

export default function History()   {

    return (
        
        <div className='container'>
          <Navbar/>
          <div>
            <SessionList/>
          </div>
        </div>

    );
}