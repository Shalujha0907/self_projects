import { useState } from 'react';
import type { Props, Todo, TodoStateSetter } from '../type';

function* generateId() {
  let count = 0
  while (true) {
    yield count++
  }
}

export const idGenerator = generateId();

export function handleSubmit({ todos, setState }: { todos: Todo[], setState: TodoStateSetter }, e: React.KeyboardEvent<HTMLInputElement>) {
  const IdGenerator = () => idGenerator.next().value as number;
  setState([...todos, { todoId: IdGenerator(), todoName: e.currentTarget.value, tasks: [] }]);
}

export function CreateInputTitle({ todos, setState }: Props) {
  const [title, setTitle] = useState("Cart");

  return <div className='input_container' id='todo_input'>
    <input type="text"
      name='todoTitle'
      value={title}
      placeholder='Enter the todo title'
      autoFocus

      onChange={(e) => setTitle(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          console.log('came inside');
          handleSubmit({ todos, setState }, e);

        }
      }}
      required />
    <button type='submit'>Submit </button>
  </div>

}
