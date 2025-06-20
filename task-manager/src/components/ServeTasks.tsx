import type { Task } from '../type';

export function ServeTasks(tasks: Task[]) {
  return tasks.map((task) => {

    return <div className="task_item">
      <div className="task_name" key={task.taskId}>{task.taskName}</div>
      <div className="task_buttons">
        <button>remove</button>
        <button>status</button>
      </div>
    </div>


  });
}
