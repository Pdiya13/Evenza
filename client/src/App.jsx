
import './App.css'
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import Features from './components/Features/Features'
import Footer from './components/Footer'
import Intro from './components/Intro'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Intro />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
