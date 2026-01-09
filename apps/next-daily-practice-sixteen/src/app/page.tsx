"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [todos, setTodos] = useState<{ id: number; text: string }[]>([]);
  const [newText, setNewText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
    setLoading(false);
  };

  const addTodo = async () => {
    if (!newText.trim()) return;

    setLoading(true);

    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newText }),
    });

    setNewText("");
    router.refresh();
  };

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">My Todos</h1>

      <div className="flex gap-3 mb-10">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Novi zadatak..."
          className="flex-1 p-3 border rounded focus:outline-none focus:border-blue-500"/>
        <button
          onClick={addTodo}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
          Add
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : todos.length === 0 ? (
        <p className="text-center text-gray-500">No todos yet</p>
      ) : (
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="p-4 bg-gray-50 rounded border border-gray-200">
              {todo.text}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}