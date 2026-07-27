import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { TaskItem, TaskPriority } from '../types/TaskItem';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

interface PriorityColor {
  priority: TaskPriority;
  color: string;
}
interface TaskItemProps {
  task: TaskItem;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TaskListItem({ task, onToggle, onDelete }: TaskItemProps) {
  const priorityColors: PriorityColor[] = [
    {
      priority: 'High',
      color: '#DC4C64',
    },
    {
      priority: 'Middle',
      color: '#E4A11B',
    },
    {
      priority: 'Low',
      color: '#14a44d',
    },
  ];

  const resolvePriority = (priority: TaskPriority | undefined) => {
    return priorityColors.find((p) => p.priority == priority);
  };

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
          <span
            className="badge"
            style={{
              backgroundColor: resolvePriority(task.priority)?.color,
            }}
          >
            {task.priority}
          </span>
        </h6>
      </td>
      <td className="align-middle">
        <a
          href="#!"
          data-mdb-tooltip-init
          title="Done"
          onClick={() => onToggle(task.id)}
        >
          <FontAwesomeIcon icon={faCheck} className="text-success me-3" />
        </a>
        <a
          href="#!"
          data-mdb-tooltip-init
          title="Remove"
          onClick={() => onDelete(task.id)}
        >
          <FontAwesomeIcon icon={faTrash} size="lg" className="text-warning" />
        </a>
      </td>
    </tr>
  );
}
