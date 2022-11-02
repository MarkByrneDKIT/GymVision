//import './App.css';
import Login from './pages/loginRegister/login'
import Register from './pages/loginRegister/register'
import{
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  //reactrouter.com quick start
  return(
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
     </Router>
  );
}

export default App;
