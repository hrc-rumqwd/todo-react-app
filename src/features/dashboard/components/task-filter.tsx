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
        className="btn btn-primary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {resolveTypeTitle()}
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {(['all', 'active', 'completed'] as FilterTypes[]).map((type) => (
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => onFilterChange(type)}
              style={{
                fontWeight: currentFilter === type ? 'bold' : 'normal',
                backgroundColor:
                  currentFilter === type ? '#ddd' : 'transparent',
              }}
            >
              {type}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
