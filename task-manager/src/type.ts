export type Task = {
  taskId: number,
  taskName: string,
  done: boolean
}

export type Todo = {
  todoId: number,
  todoName: string,
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
