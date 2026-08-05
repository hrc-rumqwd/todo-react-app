export interface DropdownItemProps {
  title: string;
  onclick: () => void;
}

export interface DropdownProps {
  title: string;
  backgroundColor?: 'primary' | 'primary-gradient' | 'primary-light';
  items: DropdownItemProps[];
}

export function Dropdown({ title, backgroundColor, items }: DropdownProps) {
  const getClasses = () => {
    switch (backgroundColor) {
      case 'primary':
        return 'bg-app-primary text-light';
      case 'primary-light':
        return 'bg-app-primary-light text-dark';
      case 'primary-gradient':
        return 'bg-app-primary-gradient text-light';
      default:
        return '';
    }
  };

  //   const getItemClasses = () => {
  //     switch (backgroundColor) {
  //       case 'primary':
  //         return 'dropdown-link-primary';
  //       case 'primary-light':
  //         return 'text-light';
  //       case 'primary-gradient':
  //         return 'dropdown-link-primary-gradient';
  //       default:
  //         return '';
  //     }
  //   };

  return (
    <div className="dropdown">
      <button
        className={`btn dropdown-toggle rounded-pill ${getClasses()}`}
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {title}
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        {items.map((t) => (
          <li key={t.title}>
            <p className={`dropdown-item cursor-pointer`} onClick={t.onclick}>
              {t.title}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
