"use client"

import { createContext, ReactNode, useContext, useState } from "react";
import { TodoContextType, TodoType } from "@/app/types/todoType";

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodoContext must be within TodoProvider");
  }
  return context;
}

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const addTodo = (todo: TodoType) => {
    const updatedTodos = [...todos, todo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  const deleteTodo = (todoId: string) => {
    const updatedTodos = todos.filter(todo => todo.todoId !== todoId);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  const loadTodos = () => {
    const stored = localStorage.getItem("todos");
    const parsed: TodoType[] = stored ? JSON.parse(stored) : [];
    setTodos(parsed);
  }

  return (
    <>
      <TodoContext.Provider value={{todos, addTodo, deleteTodo, loadTodos}}>
        {children}
      </TodoContext.Provider>
    </>
  );
}