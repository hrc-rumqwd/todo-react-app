import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { TaskDetail } from './pages/TaskDetail';
import { MainLayout } from './layouts/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthLayout } from './layouts/AuthLayout';
import { SignInForm } from './features/auth/components/SignInForm';
import { PublicRoute } from './components/PublicRoute';
import { SignUpForm } from './features/auth/components/SignUpForm';
import { SignInPath, SignUpPath } from './features/auth/types/constants';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            {/* Không truyền prop id ở đây nữa */}
            <Route path="/details/:id" element={<TaskDetail />} />
          </Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path={SignInPath} element={<SignInForm />} />
            <Route path={SignUpPath} element={<SignUpForm />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
