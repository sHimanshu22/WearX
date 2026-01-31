import React from 'react'
import Topbar from './Topbar'
import Navbar from '../Common/Navbar'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
  <div>
    {/* Header  */}
    <Header/>

    {/* Main Content  */}
    <main>
      <Outlet/>
    </main>
    
    {/* Footer  */}
    <Footer/>
    
  </div>

  )   

  
}

export default UserLayout