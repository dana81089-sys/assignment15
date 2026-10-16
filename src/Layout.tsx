import React from 'react'

import { Outlet } from 'react-router'
import Register from './Register'
import { Navbarcom } from './Navbarcom'





export default function Layout() {
  return (
    <div>
      <Navbarcom/>
     
      <Outlet/>
    </div>
  )
}
