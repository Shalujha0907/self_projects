import type { TodoStateSetter } from "../type";

function* generateId() {
  let count = 1;
  while (true) {
    yield count++;
  }
}

export const idGenerator = generateId();

export const CreateTitle = () => <h1>Task Manager!!</h1>;


export const createRequest = async (method_name: string, apiName: string, bodyContent?: string) => {
  return await fetch(`http://localhost:8080/${apiName}`,
    {
      method: method_name,
      headers: { "Content-type": "application/json" },
      body: bodyContent
    }
  );
};


export const deleteElement = (e: React.MouseEvent<HTMLButtonElement>, apiName: string) => {
  const parent = (e.target as HTMLElement).parentElement?.parentElement;
  try {
    createRequest("DELETE", `${apiName}`)
    parent?.remove();

  } catch (e) {
    console.log("Failed to delete the todo", e);
  }
}

export const toggleDone = (taskId: number, done: boolean, todoId: number, apiName: string, { setTodos }: { setTodos: TodoStateSetter }) => {
  try {
    setTodos(prev =>
      prev.map(todo =>
        todo.todo_id === todoId
          ? {
            ...todo,
            tasks: todo.tasks.map(task =>
              task.task_id === taskId ? { ...task, done: !done } : task
            )
          }
          : todo
      )
    );

    const bodyContent = JSON.stringify({ done: !done });
    createRequest("PATCH", `${apiName}`, bodyContent)
  } catch (e) {
    console.log("Failed to toggle status of task", e);
  }
};