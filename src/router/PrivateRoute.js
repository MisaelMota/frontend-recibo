import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar';
import { useAuthContext } from "../Contexts/authContext";
import { R_ROUTE } from './routes';

const PrivateRoute = () => {
    const { isAuthenticated } = useAuthContext();

    if (!isAuthenticated) {
        return <Navigate to={R_ROUTE} />
    }

    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    )
}

export default PrivateRoute