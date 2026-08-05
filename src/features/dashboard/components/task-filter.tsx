export type FilterTypes = 'all' | 'active' | 'completed';
interface TaskFilterProps {
  currentFilter: FilterTypes;
  onFilterChange: (filter: FilterTypes) => void;
}
export function TaskFilter({ currentFilter, onFilterChange }: TaskFilterProps) {
  const resolveTypeTitle = (filter: FilterTypes) => {
    if (filter == 'all') return 'All';
    else if (filter == 'active') return 'Active';
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
        {resolveTypeTitle(currentFilter)}
      </button>
      <ul className="dropdown-menu">
        {(['all', 'active', 'completed'] as FilterTypes[]).map((type) => (
          <li key={type}>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => onFilterChange(type)}
            >
              {resolveTypeTitle(type)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
