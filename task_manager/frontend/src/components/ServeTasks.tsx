import type { Task } from '../type';
import { deleteElement } from './util';

export function ServeTasks(tasks: Task[]) {
  return tasks.map((task) => {

    return <div className="task_item">
      <div className="task_name" key={task.task_id}>{task.task_name}</div>
      <div className="task_buttons">
        <button id={`${task.task_id}`} onClick={(e) => deleteElement(e, `tasks/${task.task_id}`)}>remove</button>
        <button>status</button>
      </div>
    </div>

  });
}
