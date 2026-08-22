import React from 'react'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Footer from './Footer'

const Home = () => {
  return (
    <div className='w-full  realtive'>
      <div className='w-full'>
        <Nav/>
        <Hero/>
      </div>

      <Footer/>
      
    </div>
  )
}

export default Home
