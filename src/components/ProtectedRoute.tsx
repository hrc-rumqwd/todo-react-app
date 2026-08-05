import { Navigate, Outlet } from 'react-router-dom';
import { Loading } from './ui/loading';
import { useAuth } from '../features/auth/hooks/useAuth';

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to={'/login'} replace />;
  }

  return <Outlet />;
}
