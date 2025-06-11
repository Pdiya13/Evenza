import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Features from './Features/Features'

function Intro() {
  return (
    <div className='bg-black w-screen h-screen'>
      <Header />
      <Features/>
      <Footer />
    </div>
  )
}

export default Intro
