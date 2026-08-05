import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import { Loading } from './ui/loading';
export function PublicRoute() {
  const authState = useAuth();

  if (authState.isLoading) {
    return <Loading />;
  }

  if (authState.isAuthenticated) return <Navigate to={'/'} replace />;

  return <Outlet />;
}
