import { useState, useEffect } from 'react';
import './App.css';
import { ServeTodo } from './components/ServeTodo.tsx';
import { CreateTitle } from './components/CreateTitle.tsx';
import { CreateInputTitle } from './components/CreateInputTitle.tsx';
import type { Todo } from './type.ts';

function App() {
  const [todos, setState] = useState<Todo[]>([])
  return (
    <>
      <CreateTitle />
      <CreateInputTitle todos={todos} setState={setState} />
      <ServeTodo todos={todos} setState={setState} />
    </>
  );
}

export default App;
