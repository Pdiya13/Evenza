import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout'; // <- Your layout component
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import Dashboard from './components/Dashboard';
import CreateEvent from './components/home/CreateEvent';
import ManageEvent from './components/home/ManageEvent';
import Vendors from './components/home/Vendors';
import Mainweb from './components/Mainweb';


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Mainweb />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route element={<Layout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/create' element={<CreateEvent />} />
          <Route path='/manage' element={<ManageEvent />} />
          <Route path='/vendors' element={<Vendors />} />
          {/* Add more routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
