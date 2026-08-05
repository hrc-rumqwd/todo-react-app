import { useMutation } from '@tanstack/react-query';
import { login } from '../api/auth-api';
import { ToastService } from '../../../services/toast-service';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: [IdentitySessionQueryKey] });
      navigate('/');
    },
    onError: (error) => {
      ToastService.showError(error.message);
    },
  });
}
