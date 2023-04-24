import React from 'react'
import "../Styles/NavBar.css"
import "../Styles/Login.css"
import Logo from "../Assets/Logo.svg"
import { Link } from 'react-router-dom'
import { useAuthContext } from '../Contexts/authContext'

const NavBar = () => {

    const { LogOut } = useAuthContext();
    return (
        <div className='navBar-Container'>
            <div className='logo-container-NavBar'>
                <Link to="/private">
                    <img className='img-logo' src={Logo}/>
                </Link>
            </div>

            <div className='link-container'>
                <Link to="/private/receipts" className='link-principal'>Recibos</Link>
                <Link to="/private/tenants" className='link-principal'>Inquilinos</Link>
                <Link className='link-principal' onClick={LogOut}>Cerrar Sesión</Link>
            </div>
        </div>
    )
}

export default NavBar