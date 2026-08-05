import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../services/query-client';
import { IdentitySessionQueryKey } from '../types/identity-query-keys';
import { logout } from '../api/auth-api';

export function useLogout() {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [IdentitySessionQueryKey] });
    },
  });
}
