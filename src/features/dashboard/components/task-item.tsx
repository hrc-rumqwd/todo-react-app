import type { TaskItem } from '../types/TaskItem';

// Concept: Component receives props (read-only) and render UI
interface TaskItemProps {
  task: TaskItem;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <tr className="fw-normal">
      <th>
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
          alt="avatar 1"
          style={{ width: '45px', height: 'auto' }}
        />
        <span className="ms-2">ME</span>
      </th>
      <td className="align-middle">
        <span>{task.title}</span>
      </td>
      <td className="align-middle">
        <h6 className="mb-0">
          <span className="badge bg-danger">{task.priority} priority</span>
        </h6>
      </td>
      <td className="align-middle">
        <a
          href="#!"
          data-mdb-tooltip-init
          title="Done"
          onClick={() => onToggle(task.id)}
        >
          <i className="fas fa-check fa-lg text-success me-3"></i>
        </a>
        <a
          href="#!"
          data-mdb-tooltip-init
          title="Remove"
          onClick={() => onDelete(task.id)}
        >
          <i className="fas fa-trash-alt fa-lg text-warning"></i>
        </a>
      </td>
    </tr>
  );
}
