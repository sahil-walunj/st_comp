import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            if (location.pathname === '/' || location.pathname === '/login') {
                navigate('/home', { replace: true }); // Use replace: true to replace the current entry in the history stack
            }
        } else {
            setIsAuthenticated(false);
            // Optionally, redirect to login if no token is found
            if (location.pathname !== '/login') {
                navigate('/login', { replace: true });
            }
        }
    }, [location, navigate, setIsAuthenticated]);

    return null; // This component doesn't render anything
}

export default RefreshHandler;