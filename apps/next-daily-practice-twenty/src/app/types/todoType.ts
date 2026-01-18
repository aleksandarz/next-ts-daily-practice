
export type TodoType = {
  todoId: string;
  todoTitle: string,
  todoDescription: string,
}

export type TodoContextType = {
  todos: TodoType[];
  addTodo: (todo: TodoType) => void;
  deleteTodo: (id: string) => void;
  loadTodos: () => void;
}