import React from 'react'
import "../Styles/Login.css"
import "../Styles/NavBar.css"
import NavBar from './NavBar'
import "../Styles/PrincipalMenu.css"
import ContentPrincipal from './ContentPrincipal'
import { Route,Routes } from 'react-router-dom'
import Receipts from './Receipts'
import Tenants from './Tenants'

const PrincipalMenu = () => {
  return (
    <div>
      
      <Routes>
        <Route path='/' element={<ContentPrincipal/>}/>
        <Route path='/private/Recibos' element={<Receipts/>}/>
        <Route path='/Inquilinos' element={<Tenants/>}/>
      </Routes>
      

    </div>
  )
}

export default PrincipalMenu