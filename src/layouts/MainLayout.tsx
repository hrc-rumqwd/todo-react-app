import { Navbar } from './components/Navbar';

export function MainLayout({ children }) {
  return (
    <div className="vh-100 gradient-custom-2">
      <Navbar />
      {children}
    </div>
  );
}
