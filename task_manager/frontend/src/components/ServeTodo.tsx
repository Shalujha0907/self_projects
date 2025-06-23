import { ServeTasks } from './ServeTasks';
import type { Todo, TodoStateSetter } from '../type';
import { useState } from 'react';
import { idGenerator } from './util';
import { createRequest } from './util';

const insertTask = async ({ setState }: { setState: TodoStateSetter }, todoId: number, task: { [key: number]: string }) => {
  const IdGenerator = () => idGenerator.next().value as number;
  const taskName = task[todoId]
  const newTask = { task_id: IdGenerator(), task_name: taskName, done: false }
  const bodyContent = JSON.stringify({ task_name: taskName, todo: { todo_id: todoId }, done: false })

  if (task) {
    try {
      const response = await createRequest("POST", "tasks", bodyContent);

      if (!response.ok) throw new Error("Task is not added");

      setState((prevState) => {
        return prevState.map((todo) => {
          return todo.todo_id === todoId ? { ...todo, tasks: [...todo.tasks, newTask] } : todo
        })
      })
    } catch (e) {
      console.log("Error in while adding Task", e);
    }
  }

}

const removeTodo = (e: React.MouseEvent<HTMLButtonElement>, todo: Todo) => {
  const parent = (e.target as HTMLElement).parentElement?.parentElement;

  try {
    createRequest("DELETE", `todos/${todo.todo_id}`)
    parent?.remove();

  } catch (e) {
    console.log("Failed to delete the todo", e);
  }
}

export const ServeTodo = ({ todos, setState }: { todos: Todo[], setState: TodoStateSetter }) => {
  const [task, setTask] = useState<{ [key: number]: string }>({});

  const handleTaskSubmit = (todo: Todo) => (e: React.FormEvent) => {
    e.preventDefault();
    insertTask({ setState }, todo.todo_id, task);
    setTask((prevState) => ({ ...prevState, [todo.todo_id]: "" }));
  };

  return todos.map((todo) => {
    return <div className='todo' id={`${todo.todo_id}`}>
      <div className='todo_title'>
        <h4 className='todo_name'>{todo.todo_name}</h4>
        <button className='remove_button' onClick={(e) => removeTodo(e, todo)}>remove</button>
      </div>
      <form onSubmit={handleTaskSubmit(todo)} className='input_container' id='task_input' >
        <input type="text"
          name='task'
          autoFocus
          required
          value={task[todo.todo_id] || ""}
          onChange={
            (e) => setTask((prevState) => ({ ...prevState, [todo.todo_id]: e.target.value }))
          }
        />
        <button type='submit'>Submit</button>
      </form>
      {ServeTasks(todo.tasks)}
    </div>;
  });
}
