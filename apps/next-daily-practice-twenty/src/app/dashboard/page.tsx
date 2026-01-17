"use client"

import AddTodo from "@/app/components/AddTodo";
import TodoList from "@/app/components/TodoList";
import { useLoginContext } from "@/app/context/LoginContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "@/app/components/Spinner";

const Dashboard = () => {

  const { loggedIn, loading } = useLoginContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !loggedIn) {
      router.replace("/login");
    }
  }, [loggedIn, loading, router]);

  if (loading) return <Spinner />;
  if (!loggedIn) return null;

  return (
    <>
      <header className="flex items-center h-24 w-full border-b border-orange-400">
        <h2 className="text-orange-400 text-2xl pl-5">Dashboard</h2>
      </header>
      <main className="flex flex-col gap-10 min-h-screen w-full items-center py-10">
        <AddTodo />
        <TodoList />
      </main>
    </>
  );
}

export default Dashboard;