export type FilterTypes = 'all' | 'active' | 'completed';
interface TaskFilterProps {
  currentFilter: FilterTypes;
  onFilterChange: (filter: FilterTypes) => void;
}
export function TaskFilter({ currentFilter, onFilterChange }: TaskFilterProps) {
  const resolveTypeTitle = () => {
    if (currentFilter == 'all') return 'All';
    else if (currentFilter == 'active') return 'Active';

    return 'Completed';
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {resolveTypeTitle()}
      </button>
      <ul className="dropdown-menu">
        {(['all', 'active', 'completed'] as FilterTypes[]).map((type) => (
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => onFilterChange(type)}
            >
              {type.toUpperCase()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
