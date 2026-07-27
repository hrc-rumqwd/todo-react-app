import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { TaskDetail } from './pages/TaskDetail';
import { MainLayout } from './layouts/MainLayout';

export function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Không truyền prop id ở đây nữa */}
          <Route path="/details/:id" element={<TaskDetail />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
