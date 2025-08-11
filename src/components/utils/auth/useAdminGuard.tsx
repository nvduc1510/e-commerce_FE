import { useEffect } from 'react';
import { useAuth } from './authContext';
import { useNavigate } from 'react-router-dom';

export const useAdminGuard = () => {
    const { isAuthenticated, isAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
        navigate('/login');
        } else if (!isAdmin()) {
        navigate('/');
        }
    }, [isAuthenticated, isAdmin, navigate]);
};
