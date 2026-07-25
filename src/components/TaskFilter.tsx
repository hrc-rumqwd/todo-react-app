type FilterTypes = "all" | "active" | "completed";
interface TaskFilterProps {
  currentFilter: FilterTypes;
  onFilterChange: (filter: FilterTypes) => void;
}
export function TaskFilter({ currentFilter, onFilterChange }: TaskFilterProps) {
  return (
    <div>
      {(["all", "active", "completed"] as FilterTypes[]).map((type) => (
        <button
          key={type}
          onClick={() => onFilterChange(type)}
          style={{
            fontWeight: currentFilter === type ? "bold" : "normal",
            backgroundColor: currentFilter === type ? "#ddd" : "transparent",
          }}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
