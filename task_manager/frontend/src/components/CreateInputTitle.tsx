import { useState } from 'react';
import type { Props, Todo, TodoStateSetter } from '../type';

function* generateId() {
  let count = 0
  while (true) {
    yield count++
  }
}

export const idGenerator = generateId();

export async function handleSubmit({ todos: prevState, setState, title }: { todos: Todo[], setState: TodoStateSetter, title: string }, e: React.KeyboardEvent<HTMLInputElement>) {
  // const IdGenerator = () => idGenerator.next().value as number;

  if (title) {
    try {
      const response = await fetch(`http://localhost:8080/todos`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ todo_name: title, done: false })
        }
      );

      const savedTodo = await response.json();

      console.log('sdf', savedTodo);

      setState((prevState) => [...prevState, { ...savedTodo, tasks: [] }]);

      if (!response.ok) {
        throw new Error("Todo is not added");
      }

    } catch (e) {
      console.log("Error in while adding todo", e);
    }
  }
}

export function CreateInputTitle({ todos, setState }: Props) {
  const [title, setTitle] = useState("");

  console.log('title', title);

  return <div className='input_container' id='todo_input'>
    <input type="text"
      name='todoTitle'
      value={title}
      placeholder='Enter the todo title'
      autoFocus

      onChange={(e) => setTitle(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          handleSubmit({ todos, setState, title }, e);
          setTitle("")
        }
      }}
      required />
    <button type='submit'>Submit </button>
  </div>

}
