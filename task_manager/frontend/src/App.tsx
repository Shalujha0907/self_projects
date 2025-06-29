import { useState, useEffect } from 'react';
import './App.css';
import { ServeTodo } from './components/ServeTodo.tsx';
import { CreateTitle } from './components/util.tsx';
import { CreateInputTitle } from './components/CreateInputTitle.tsx';
import type { Todo } from './type.ts';

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  return (
    <>
      <CreateTitle />
      <CreateInputTitle todos={todos} setState={setTodos} />
      <ServeTodo todos={todos} setTodos={setTodos} />
    </>
  );
}

export default App;


