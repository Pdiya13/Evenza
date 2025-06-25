import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout'; // <- Your layout component
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import Dashboard from './components/home/Dashboard';
import CreateEvent from './components/home/CreateEvent';
import ManageEvent from './components/home/ManageEvent';
import Vendors from './components/home/Vendors';
import Mainweb from './components/Mainweb';
import BudgetManagement from './components/events/BudgetManagement';
import GuestManagement from './components/events/GuestManagement';
import SelectVendor from './components/events/SelectVendor';
import EventNavbar from './components/events/EventNavbar';
import EventLayout from './components/EventLayout';
import SmartChecklist from './components/events/SmartChecklist';
import SmartChecklist1 from './components/plan-vendors/SmartChecklist';
import BudgetManagement1 from './components/plan-vendors/BudgetManagement';
import PlanLayout from './components/plan-vendors/PlanLayout'
import { Toaster } from 'react-hot-toast';
import VendorLayout from './components/Home_vendor/VendorLayout';
import Payments from './components/Home_vendor/Payments';
import Ratings from './components/Home_vendor/Ratings';
import VendorDashboard from './components/Home_vendor/VendorDashboard';
import EventList from './components/Home_vendor/EventList';

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path='/' element={<Mainweb />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route element={<Layout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/create' element={<CreateEvent />} />
          <Route path='/manage' element={<ManageEvent />} />
          <Route path='/vendors' element={<Vendors />} />
        </Route>
        <Route element={<EventLayout />}>
          <Route path='/budget' element={<BudgetManagement />}></Route>
          <Route path='/guests' element={<GuestManagement />}></Route>
          <Route path='/select-vendor' element={<SelectVendor />}></Route>
          <Route path='/checklist' element={<SmartChecklist />}></Route>
        </Route>
        <Route element={<VendorLayout />}>
          <Route path = '/vendor-checklist' element={<SmartChecklist1></SmartChecklist1>}></Route>
          <Route path = '/vendor-budget' element={<BudgetManagement1></BudgetManagement1>}></Route>
        </Route>
        <Route element={<VendorLayout />}>
          <Route path = '/vendor-dashboard' element={<VendorDashboard />}></Route>
          <Route path = '/eventslist' element={<EventList/>}></Route>
          <Route path = '/payments' element={<Payments/>}></Route>
          <Route path = '/ratings' element={<Ratings/>}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
