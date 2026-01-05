
export type TodoType = {
  id: string;
  text: string;
  completed: boolean;
}

export type TodoReturnType = {
  todos: TodoType[];
  addTodo: (text: string) => TodoType;
  toggleTodo: (id: string) => void;
  clearCompleted: () => void;
};