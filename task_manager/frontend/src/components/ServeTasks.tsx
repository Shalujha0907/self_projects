import type { ServeTasksProps } from '../type';
import { deleteElement, toggleDone, } from './util';

export function ServeTasks({ tasks, todoId, setTodos }: ServeTasksProps) {

  return tasks.map(({ task_id, task_name, done }) => {
    return <div className="task_item" key={task_id}>
      <div className="task_name" key={task_id}>{task_name}</div>
      <div className="task_buttons">
        <button id={`${task_id}`} onClick={(e) => deleteElement(e, `tasks/${task_id}`)}>remove</button>

        <button id={`${task_id}`} onClick={() => toggleDone(task_id, done, todoId, `tasks/${task_id}`, { setTodos })} >{done ? "done" : "undone"}</button>
      </div>
    </div>
  });
}
