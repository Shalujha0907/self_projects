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
    return <div key={task.taskId}>{task.taskName}</div>

  })
}

function serveTodo() {
  return fakeTodo.map((todo) => {
    return <div key={todo.todoId}>
      <h2>{todo.todoName}</h2>
      {serveTasks(todo.tasks)}

    </div>
  })

}

function App() {
  return (
    <>
      <h1>Task Manager!!</h1>
      {serveTodo()}

    </>
  )
}

export default App
