export type Task = {
  task_id: number,
  task_name: string,
  done: boolean
}

export type Todo = {
  todo_id: number,
  todo_name: string,
  tasks: Task[]
}

export type ServeTasksProps = {
  tasks: Task[];
  todoId: number;
  setTodos: TodoStateSetter;
};

export type TodoStateSetter = React.Dispatch<React.SetStateAction<Todo[]>>
export type TaskStateSetter = React.Dispatch<React.SetStateAction<Task[]>>;

export type Props = {
  todos: Todo[],
  setState: TodoStateSetter
}


export type TaskProps = {
  tasks: Task[],
  setTask: TaskStateSetter
}
