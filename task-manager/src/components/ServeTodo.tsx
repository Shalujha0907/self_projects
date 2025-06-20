import { ServeTasks } from './ServeTasks';
import type { Todo, TodoStateSetter } from '../type';
import { useState } from 'react';
import { idGenerator } from './CreateInputTitle';

const insertTask = ({ setState }: { setState: TodoStateSetter }, todoId: number, task: string) => {
  const IdGenerator = () => idGenerator.next().value as number;
  const newTask = { taskId: IdGenerator(), taskName: task, done: false }

  setState((prevState) => {
    return prevState.map((todo) => {
      return todo.todoId === todoId ? { ...todo, tasks: [...todo.tasks, newTask] } : todo
    })
  })
}

export function ServeTodo({ todos, setState }: { todos: Todo[], setState: TodoStateSetter }) {
  const [task, setTask] = useState("Buy Phone");

  return todos.map((todo) => {
    return <div id='todo' key={todo.todoId}>
      <div id='todo_title'>
        <h4 id='todo_name'>{todo.todoName}</h4>
        <button id='remove_button'>remove</button>
      </div>
      <div className='input_container' id='task_input' >
        <input type="text"
          name='task'
          autoFocus
          required
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              insertTask({ setState }, todo.todoId as number, task)
            }
          }}
        />
        <button type='submit'>Submit</button>
      </div>
      {ServeTasks(todo.tasks)}
    </div>;
  });
}
