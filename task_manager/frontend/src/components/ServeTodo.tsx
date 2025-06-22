import { ServeTasks } from './ServeTasks';
import type { Todo, TodoStateSetter } from '../type';
import { useState } from 'react';
import { idGenerator } from './CreateInputTitle';

const insertTask = async ({ setState }: { setState: TodoStateSetter }, todoId: number, task_name: string) => {
  const IdGenerator = () => idGenerator.next().value as number;
  const newTask = { task_id: IdGenerator(), task_name: task_name, done: false }

  console.log("while sending fetch req:-", todoId);

  if (task_name) {
    try {
      const response = await fetch(`http://localhost:8080/tasks`, {
        method: "POST", headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          taskName: task_name,
          done: false,
          todo: {
            todoId: todoId
          }
        })
      })

      if (!response.ok) {
        throw new Error("Task is not added");
      }

      setState((prevState) => {
        return prevState.map((todo) => {
          return todo.todoId === todoId ? { ...todo, tasks: [...todo.tasks, newTask] } : todo
        })
      })
    } catch (e) {
      console.log("Error in while adding Task", e);
    }
  }

}

export function ServeTodo({ todos, setState }: { todos: Todo[], setState: TodoStateSetter }) {
  const [task_name, setTask] = useState("");

  return todos.map((todo) => {
    console.log('todo', todo);

    return <div id='todo'>
      <div id='todo_title'>
        <h4 id='todo_name'>{todo.todo_name}</h4>
        <button id='remove_button'>remove</button>
      </div>
      <div className='input_container' id='task_input' >
        <input type="text"
          name='task'
          autoFocus
          required
          value={task_name}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              insertTask({ setState }, todo.todoId as number, task_name);
              setTask("");
            }
          }}
        />
        <button type='submit'>Submit</button>
      </div>
      {ServeTasks(todo.tasks)}
    </div>;
  });
}
