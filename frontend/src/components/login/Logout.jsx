import { useNavigate } from 'react-router-dom';
import { clearSession } from '../../api/client';

export function useUserLogout() {
    const navigate = useNavigate();

    const logout = () => {
        // Removes tokens and the query cache
        clearSession();
        navigate('/login');
    }

    return logout;
}
