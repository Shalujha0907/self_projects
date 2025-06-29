import { ServeTasks } from './ServeTasks';
import type { Todo, TodoStateSetter } from '../type';
import { useState } from 'react';
import { deleteElement, idGenerator } from './util';
import { createRequest, } from './util';

const insertTask = async ({ setTodos }: { setTodos: TodoStateSetter }, todoId: number, task: { [key: number]: string }) => {
  const IdGenerator = () => idGenerator.next().value as number;
  const taskName = task[todoId]
  const newTask = { task_id: IdGenerator(), task_name: taskName, done: false }
  const bodyContent = JSON.stringify({ task_name: taskName, todo: { todo_id: todoId }, done: false })

  if (task) {
    try {
      const response = await createRequest("POST", "tasks", bodyContent);

      if (!response.ok) throw new Error("Task is not added");

      setTodos((prevState) => {
        return prevState.map((todo) => {
          return todo.todo_id === todoId ? { ...todo, tasks: [...todo.tasks, newTask] } : todo
        })
      })
    } catch (e) {
      console.log("Error in while adding Task", e);
    }
  }

}

export const ServeTodo = ({ todos, setTodos }: { todos: Todo[], setTodos: TodoStateSetter }) => {
  const [task, setTask] = useState<{ [key: number]: string }>({});

  const handleTaskSubmit = (todo: Todo) => (e: React.FormEvent) => {
    e.preventDefault();
    insertTask({ setTodos }, todo.todo_id, task);
    setTask((prevState) => ({ ...prevState, [todo.todo_id]: "" }));
  };

  return todos.map((todo) => {
    return <div className='todo' id={`${todo.todo_id}`} key={todo.todo_id}>
      <div className='todo_title'>
        <h4 className='todo_name'>{todo.todo_name}</h4>
        <button className='remove_button' onClick={(e) => deleteElement(e, `todos/${todo.todo_id}`)}>remove</button>
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
      <ServeTasks tasks={todo.tasks} todoId={todo.todo_id} setTodos={setTodos} />
    </div>;
  });
}
