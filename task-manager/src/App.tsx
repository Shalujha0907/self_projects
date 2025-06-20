import { useState } from 'react';
import './App.css';
import { ServeTodo } from './components/ServeTodo.tsx';
import { CreateTitle } from './components/CreateTitle.tsx';
import { CreateInputTitle } from './components/CreateInputTitle.tsx';
import type { Todo } from './type.ts';

export const fakeTodo = [
  {
    todoId: 1,
    todoName: "Shopping",
    tasks: [
      { taskId: 1, taskName: "Buy Bottle", done: false },
      { taskId: 2, taskName: "Buy Pen", done: false },
      { taskId: 3, taskName: "Buy Sleepers", done: false },
      { taskId: 4, taskName: "Buy Kurta", done: false }
    ]
  },
  {
    todoId: 2,
    todoName: "Cosmetics-Stuffs",
    tasks: [
      { taskId: 1, taskName: "Buy clutcher", done: false },
      { taskId: 2, taskName: "Buy clip", done: false },
      { taskId: 3, taskName: "Buy hair-band", done: false },
      { taskId: 4, taskName: "Buy serum", done: false }
    ]
  },
  {
    todoId: 3,
    todoName: "HouseHold-Stuffs",
    tasks: [
      { taskId: 1, taskName: "Buy pasta", done: false },
      { taskId: 2, taskName: "Buy chips", done: false },
      { taskId: 3, taskName: "Buy chocolate", done: false },
      { taskId: 4, taskName: "Buy maggie", done: false }
    ]
  }
]


function App() {
  const [todos, setState] = useState<Todo[]>([])

  return (
    <>
      <CreateTitle />
      <CreateInputTitle todos={todos} setState={setState} />
      <ServeTodo todos={todos} setState={setState} />
    </>
  )
}

export default App