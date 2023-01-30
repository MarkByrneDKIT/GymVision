import React from 'react'
import './navbar.css'
import logo from '../../pages/Images/logo-white.png'

export default function Navbar() {
  return (
    <div className='navbar'>
      
        <a href='/home'><img src={logo}></img></a>
        <a className="links" href='/login'>Logout</a>
        <a className="links" href='/LiftSelection'>Lifts</a>
        <a className="links" href='/history'>History</a>
    </div>
  )
}
