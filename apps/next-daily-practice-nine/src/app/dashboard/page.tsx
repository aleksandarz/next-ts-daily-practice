"use client";

import { useState } from "react";
import { useAuth } from "@/app/context/authContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";

const Dashboard = () => {
  const { user } = useAuth();

  const [noteName, setNoteName] = useState("");
  const [noteText, setNoteText] = useState("");

  const addNote = async () => {
    if (!user) return;

    if (!noteName.trim() || !noteText.trim()) {
      alert("Note name and text are required");
      return;
    }

    try {
      await addDoc(collection(db, "notes"), {
        userId: user.uid,
        title: noteName,
        description: noteText,
        createdAt: serverTimestamp(),
      });

      setNoteName("");
      setNoteText("");
      alert("Note saved");
    } catch (error) {
      console.error("Error while adding note", error);
    }
  };

  return (
    <main className="w-full min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-2xl">
        <form className="flex flex-col space-y-5">
          <input
            placeholder="Note name"
            type="text"
            value={noteName}
            onChange={(e) => setNoteName(e.target.value)}
            className="w-[30rem] h-10 rounded border border-pink-400 pl-3 outline-none focus:border-pink-600"/>
          <textarea
            value={noteText}
            placeholder="Note text"
            onChange={(e) => setNoteText(e.target.value)}
            className="w-[30rem] h-40 rounded border border-pink-400 pl-3 p-1.5 outline-none focus:border-pink-600"/>
          <button
            type="button"
            onClick={() => addNote}
            className="w-[30rem] h-10 rounded text-white border border-pink-400 bg-pink-400 text-white
            hover:bg-transparent hover:text-pink-400 transition duration-150 ease">
            Add new note
          </button>
        </form>
      </div>
    </main>
  );
};

export default Dashboard;