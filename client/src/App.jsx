import './App.css';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import Dashboard from './components/Dashboard';
import Features from './components/Features/Features';
import Footer from './components/Footer';
import CreateEvent from './components/home/CreateEvent';
import ManageEvent from './components/home/ManageEvent';
import Vendors from './components/home/Vendors';
import Mainweb from './components/Mainweb';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Mainweb />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/create' element={<CreateEvent />}></Route>
          <Route path='/vendors' element={<Vendors />}></Route>
          <Route path='/manage' element={<ManageEvent />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
