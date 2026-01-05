"use client"

import { useTodoContext } from "@/app/context/TodoContext";

const TodoList = () => {

  const { toggleTodo, todos } = useTodoContext();

  return (
    <>
      <div>
        {todos.map((todo) => (
          <div
            className="border-b-2 border-pink-200 p-5 w-[30rem] h-fit"
            key={todo.id}>
            <p className="text-xl font-semibold">{todo.text}</p>
            <label
              className="flex items-center gap-3"
              htmlFor="completed">
              Completed
              <input
                id="completed"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                type="checkbox" />
            </label>
          </div>
        ))}
      </div>
    </>
  );
}

export default TodoList;