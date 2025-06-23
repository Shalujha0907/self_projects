function* generateId() {
  let count = 0;
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

  console.log("parent:- ", parent);

  try {
    createRequest("DELETE", `${apiName}`)
    parent?.remove();

  } catch (e) {
    console.log("Failed to delete the todo", e);
  }
}

