import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem('token');

    if (!token) return <Navigate to="/login" replace />;

    try {
        const decoded = jwtDecode(token);

        const userRole = decoded.role;

        console.log('Token found:', !!token);
        console.log('Decoded role:', userRole);
        console.log('Allowed roles:', allowedRoles);
        console.log('Role included?', allowedRoles.includes(userRole));

        if (allowedRoles.includes(userRole)) {
            return <Outlet />;
        } else {
            return <Navigate to="/unauthorized" replace />;
        }
    } catch (err) {
        console.error('Token decoding failed:', err);
        return <Navigate to="/login" replace />;
    }
};

export default PrivateRoute;
