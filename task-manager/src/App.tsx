import { useState } from 'react';
import './App.css';
import type { task } from './type.ts';

const fakeTodo = [
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


function serveTasks(tasks: task[]) {
  return tasks.map((task) => {
    return <div
      key={task.taskId}>{task.taskName}
      <button>remove</button>
      <button>status</button>
    </div>

  })
}

function serveTodo() {
  return fakeTodo.map((todo) => {
    return <div id='todo' key={todo.todoId}>
      <div id='todo_title'>
        <h4 id='todo_name'>{todo.todoName}</h4>
        <button id='remove_button'>remove</button>
      </div>
      {serveTasks(todo.tasks)}

    </div>
  })
}

function handleSubmit(title) {
  console.log(title);

}

function createTitle() {
  return <h1>Task Manager!!</h1>
}

function createInputTitle() {
  const [title, setTitle] = useState("")

  return <div id='input_bar'>
    <input type="text"
      name='todoTitle'
      value={title}
      placeholder='Enter the todo title'
      onChange={(e) => setTitle(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          return handleSubmit(e)
        }
      }}
      autoFocus
      required />
    <button onClick={handleSubmit} type='submit'>Submit </button>
  </div>;
}

function App() {
  return (
    <>
      {createTitle()}
      {createInputTitle()}
      {serveTodo()}
    </>
  )
}

export default App


