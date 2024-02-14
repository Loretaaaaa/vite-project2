// create a mock api endpoint will all the todos which will be used to fetch the todos
// and will be stored in the local storage

export type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  status: string;
  createdAt: number;
};

export const getTodos = (): Promise<Todo[]> => {
  console.log("getTodos");
  return new Promise<Todo[]>((resolve) => {
    setTimeout(() => {
      resolve(
        loadTodosFromLocalStorage().sort((a, b) => b.createdAt - a.createdAt)
      );
    }, 300);
  });
};

export const getTodo = (id: string) => {
  return new Promise<Todo | null>((resolve, reject) => {
    setTimeout(() => {
      const todo = loadTodosFromLocalStorage().find((t) => t.id === id);
      if (todo) resolve(todo);
      else reject(new Error("Todo not found"));
    }, 300);
  });
};

// export const createTodo = (todo: Todo) => {
//   return new Promise<Todo>((resolve) => {
//     setTimeout(() => {
//       const todos = loadTodosFromLocalStorage();
//       todos.push(todo);
//       saveTodosToLocalStorage(todos);
//       resolve(todo);
//     }, 300);
//   });
// };

export const createTodo = async (todo: Todo) => {
  return new Promise<Todo>((resolve, reject) => {
    setTimeout(() => {
      try {
        const todos = loadTodosFromLocalStorage();
        todos.push(todo);
        saveTodosToLocalStorage(todos);
        resolve(todo);
      } catch (error) {
        console.error("Error creating todo:", error);
        // Reject the promise in case of an error
        // You might want to add proper error handling based on your application's needs
        reject(error);
      }
    }, 300);
  });
};

export const updateTodo = (todo: Todo) => {
  return new Promise<Todo>((resolve) => {
    setTimeout(() => {
      const todos = loadTodosFromLocalStorage();
      const index = todos.findIndex((t) => t.id === todo.id);
      todos[index] = todo;
      saveTodosToLocalStorage(todos);
      resolve(todo);
    }, 300);
  });
};

export const deleteTodo = (id: string) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      const todos = loadTodosFromLocalStorage();
      const index = todos.findIndex((t) => t.id === id);
      todos.splice(index, 1);
      saveTodosToLocalStorage(todos);
      resolve(id);
    }, 300);
  });
};

export const toggleTodo = (id: string) => {
  return new Promise<Todo>((resolve) => {
    setTimeout(() => {
      const todos = loadTodosFromLocalStorage();
      const index = todos.findIndex((t) => t.id === id);
      todos[index].completed = !todos[index].completed;
      saveTodosToLocalStorage(todos);
      resolve(todos[index]);
    }, 300);
  });
};

function saveTodosToLocalStorage(todos: Todo[]) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodosFromLocalStorage(): Todo[] {
  const todosString = localStorage.getItem("todos");
  return todosString ? JSON.parse(todosString) : [];
}
