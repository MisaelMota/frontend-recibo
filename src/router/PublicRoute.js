import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from "../Contexts/authContext";
import { PRIVATE } from './routes';

const PublicRoute = () => {
    const {isAuthenticated} = useAuthContext();

    if (isAuthenticated) {
        return <Navigate to={PRIVATE} />
    }
    return (
        <div><Outlet /></div>
    )
}

export default PublicRoute