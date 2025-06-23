import { ServeTasks } from './ServeTasks';
import type { Todo, TodoStateSetter } from '../type';
import { useState } from 'react';
import { idGenerator } from './util';
import { createRequest } from './util';

const insertTask = async ({ setState }: { setState: TodoStateSetter }, todoId: number, task: { [key: number]: string }) => {
  const IdGenerator = () => idGenerator.next().value as number;
  const taskName = task[todoId]
  const newTask = { task_id: IdGenerator(), task_name: taskName, done: false }
  const bodyContent = JSON.stringify({ taskName: taskName, todo: { todo_id: todoId }, done: false })

  if (task) {
    try {
      const response = await createRequest("POST", bodyContent, "tasks");

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

export const ServeTodo = ({ todos, setState }: { todos: Todo[], setState: TodoStateSetter }) => {
  const [task, setTask] = useState<{ [key: number]: string }>({});

  const handleTaskSubmit = (todo: Todo) => (e: React.FormEvent) => {
    e.preventDefault();
    insertTask({ setState }, todo.todo_id, task);
    setTask((prevState) => ({ ...prevState, [todo.todo_id]: "" }));
  };

  return todos.map((todo) => {
    return <div id='todo'>
      <div id='todo_title'>
        <h4 id='todo_name'>{todo.todo_name}</h4>
        <button id='remove_button'>remove</button>
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
