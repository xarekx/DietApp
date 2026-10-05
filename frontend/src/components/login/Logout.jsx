import { useLogout } from '../../api/hooks';
import { useNavigate } from 'react-router-dom';

export function useUserLogout() {
    const logoutMutation = useLogout();
    const navigate = useNavigate();

    const logout = () => {
        logoutMutation.mutate(undefined, {
            onSettled: () => {
                navigate('/login');
            },
        });
    }

    return logout;
}
