import React from 'react';
import { useNavigate } from 'react-router-dom';

export function useUserLogout() { 
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');

        console.log('Access token removed from localStorage');
        console.log('Refresh token removed from localStorage');

        navigate('/login');
    }

    return logout;
}