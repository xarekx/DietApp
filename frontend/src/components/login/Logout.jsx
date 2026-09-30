import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../api/hooks';

export function useUserLogout() {
    const navigate = useNavigate();
    const logoutMutation = useLogout();

    const logout = () => {
        logoutMutation.mutate();
        navigate('/login');
    }

    return logout;
}
