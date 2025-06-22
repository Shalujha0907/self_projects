export type Task = {
  task_id: number,
  task_name: string,
  done: boolean
}

export type Todo = {
  todoId: number,
  todo_name: string,
  tasks: Task[]
}

export type TodoStateSetter = React.Dispatch<React.SetStateAction<Todo[]>>
export type TaskStateSetter = React.Dispatch<React.SetStateAction<Task[]>>

export type Props = {
  todos: Todo[],
  setState: TodoStateSetter
}


export type TaskProps = {
  tasks: Task[],
  setTask: TaskStateSetter
}
