import { useQuery } from '@tanstack/react-query';
import { fetchMe } from '../api/auth-api';
import { IdentitySessionQueryKey } from '../types/identity-query-keys';

export function useAuth() {
  const {
    data: token,
    isLoading,
    // isError,
  } = useQuery({
    queryKey: [IdentitySessionQueryKey],
    queryFn: fetchMe,
    retry: false,
  });

  const hasToken = Boolean(token?.accessToken);

  return {
    token: token?.accessToken,
    refreshToken: token?.refreshToken,
    isAuthenticated: hasToken,
    isLoading,
  };
}
