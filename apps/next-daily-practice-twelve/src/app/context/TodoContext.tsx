"use client"

import React, { createContext, useContext, useState } from "react";
import { TodoReturnType, TodoType } from "@/app/types/todoType";
import { v4 as uuidv4 } from 'uuid';

export const TodoContext = createContext<TodoReturnType | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodoContext must be within TodoProvider")
  }
  return context;
}

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const addTodo = (text: string): TodoType => {
    const newTodo: TodoType = {
      id: uuidv4(),
      text,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    return newTodo;
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  return (
    <>
      <TodoContext.Provider value={{todos, addTodo, toggleTodo, clearCompleted}}>
        {children}
      </TodoContext.Provider>
    </>
  );
}
