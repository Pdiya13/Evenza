import React from 'react'
import Navbar from './Navbar'
import Header from './Header'
function Dashboard() {
  return (
    <div className='w-screen min-h-screen bg-[#F1F5FF]'>
        <Header title={["Reminders" , "User"]}/>
        
        <Navbar />
    </div>
  )
}

export default Dashboard
