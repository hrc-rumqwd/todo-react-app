import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  priorityColors,
  type TaskItem,
  type TaskPriority,
} from '../types/TaskItem';
import { faCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

interface TaskItemProps {
  task: TaskItem;
  onEdit: (id: number) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onClick: (id: number) => void;
}

export function TaskListItem({
  task,
  onEdit,
  onToggle,
  onDelete,
  onClick,
}: TaskItemProps) {
  const resolvePriority = (priority: TaskPriority | undefined) => {
    return priorityColors.find((p) => p.priority == priority);
  };

  const isCompletedTask = (task: TaskItem) => task.status === 'Done';

  return (
    <tr
      className={`fw-normal task-item ${isCompletedTask(task) ? 'opacity-50' : ''}`}
    >
      <th>
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
          alt="avatar 1"
          style={{ width: '45px', height: 'auto' }}
        />
        <span className="ms-2">{task.authorName}</span>
      </th>
      <td className="align-middle" style={{ cursor: 'pointer' }}>
        <span
          className={
            isCompletedTask(task)
              ? 'text-muted text-decoration-line-through'
              : ''
          }
          onClick={() => onClick(task.id)}
        >
          {task.title}
        </span>
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
          title="Edit"
          onClick={() => onEdit(task.id)}
        >
          <FontAwesomeIcon
            icon={faPen}
            className="text-warning me-3"
            id="editBtn"
          />
        </a>
        <a
          href="#!"
          data-mdb-tooltip-init
          title="Done"
          onClick={() => onToggle(task.id)}
        >
          <FontAwesomeIcon
            icon={faCheck}
            className="text-success me-3"
            id="doneBtn"
          />
        </a>
        <a
          href="#!"
          data-mdb-tooltip-init
          title="Remove"
          onClick={() => onDelete(task.id)}
        >
          <FontAwesomeIcon icon={faTrash} size="lg" className="text-danger" />
        </a>
      </td>
    </tr>
  );
}
