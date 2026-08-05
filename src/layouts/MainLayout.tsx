import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { ToastContainer } from 'react-toastify';

export function MainLayout() {
  return (
    <div className="vh-100 gradient-custom-2">
      <Navbar />
      <Outlet />
      <ToastContainer />
    </div>
  );
}
