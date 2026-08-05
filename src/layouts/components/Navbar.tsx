import { Dropdown, type DropdownItemProps } from '../../components/ui/dropdown';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useLogout } from '../../features/auth/hooks/useLogout';

export function Navbar() {
  const logOutMutation = useLogout();
  const { refreshToken } = useAuth();
  const items = [
    {
      title: 'Sign out',
      onclick: () => {
        logOutMutation.mutate({ refreshToken: refreshToken });
      },
    },
  ] as DropdownItemProps[];

  return (
    <nav className="navbar navbar-expand-lg link-dark">
      <div className="container rounded-pill bg-light w-100 py-2">
        <a className="navbar-brand text-reset" href="#">
          Todo
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="me-auto" />
          <Dropdown
            title="Setting"
            backgroundColor="primary-gradient"
            items={items}
          />
        </div>
      </div>
    </nav>
  );
}
