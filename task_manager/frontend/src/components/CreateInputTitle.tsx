import { useState } from 'react';
import type { Props, Todo, TodoStateSetter } from '../type';
import { createRequest } from './util';

export const insertTodo = async ({ setState, title }: { todos: Todo[], setState: TodoStateSetter, title: string }) => {
  if (title) {
    try {
      const bodyContent = JSON.stringify({ todo_name: title, done: false })
      const response = await createRequest("POST", bodyContent, "todos");
      const savedTodo = await response.json();

      setState((prevState) => [...prevState, { ...savedTodo, tasks: [] }]);
      if (!response.ok) throw new Error("Todo is not added");
    } catch (e) { console.log("Error in while adding todo", e) };
  }
}

export const CreateInputTitle = ({ todos, setState }: Props) => {
  const [title, setTitle] = useState("");
  const handleTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    insertTodo({ todos, setState, title });
    setTitle("");
  };

  return <form onSubmit={handleTitleSubmit} className='input_container' id='todo_input'>
    <input type="text"
      name='todoTitle'
      value={title}
      placeholder='Enter the todo title'
      autoFocus
      onChange={(e) => setTitle(e.target.value)}
      required />
    <button type='submit'>Submit </button>
  </form>
}
