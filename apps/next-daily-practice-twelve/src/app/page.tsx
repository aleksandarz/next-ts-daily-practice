"use client"

import TodoInput from "@/app/components/TodoInput";
import TodoList from "@/app/components/TodoList";
import TodoFooter from "@/app/components/TodoFooter";

export default function Home() {
  return (
    <>
      <main className="min-h-screen w-full">
        <div className="flex flex-col gap-5 items-center w-full pt-10">
          <TodoInput />
          <TodoList />
          <TodoFooter />
        </div>
      </main>
    </>
  );
}
