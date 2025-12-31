"use client"

import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebase.config";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  doc,
  deleteDoc,
  Timestamp,
  updateDoc } from "@firebase/firestore";

export type NotesPayload = {
  id: string;
  noteName: string;
  noteText: string;
  createdAt: Timestamp | null;
}

const Notes = () => {

  const [noteName, setNoteName] = useState<string>("");
  const [noteText, setNoteText] = useState<string>("");
  const [notes, setNotes] = useState<NotesPayload[]>([]);

  const addNote = async () => {
    await addDoc(collection(db, "notes"), {
      noteName: noteName,
      noteText: noteText,
      createdAt: serverTimestamp(),
    });
    setNoteName("");
    setNoteText("");
    await fetchNotes();
  }

  const fetchNotes = async () => {
    const snapshot = await getDocs(collection(db, "notes"));

    const fetchedNotes: NotesPayload[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<NotesPayload, "id">),
    }));

    setNotes(fetchedNotes);
  };

  useEffect(() => {
    const callFunc = async () => {
      await fetchNotes();
    }
    callFunc();
  }, []);

  const deleteNote = async (nodeId: string) => {
    await deleteDoc(doc(db, "notes", nodeId));
    await fetchNotes();
  }

  const updateNote = async (nodeId: string) => {
    const newNoteName = prompt("Enter new note name: ");
    if (!newNoteName) return;

    const newNoteText = prompt("Enter new note text: ");
    if (!newNoteText) return;

    const noteRef = doc(db, "notes", nodeId);
    await updateDoc(noteRef, {
      noteName: newNoteName,
      noteText: newNoteText
    });

    await fetchNotes();
  }

  return (
    <>
      <form
        className="flex flex-col gap-3 min-w-full items-center mt-10">
        <input
          type="text"
          value={noteName}
          onChange={(e) => setNoteName(e.target.value)}
          className="w-[30rem] h-10 rounded border border-purple-300 outline-none p-1.5"
          placeholder="Enter your note name"/>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          className="w-[30rem] h-32 rounded border border-purple-300 outline-none p-1.5"
          placeholder="Enter your note text">
        </textarea>
        <button
          type="button"
          onClick={() => addNote()}
          className="w-[30rem] h-10 rounded border border-purple-300 text-white bg-purple-300
            hover:bg-transparent hover:text-purple-300 transition duration-200 ease-in">
          Add note
        </button>
      </form>

      <div className="flex flex-col gap-3 min-w-full items-center mt-10 w-96">
        {notes.map((note) => {
          return (
            <div key={note.id} className="flex flex-col gap-3">
              <p className="text-xl">{note.noteName}</p>
              <p>{note.noteText}</p>
              <div className="space-x-3">
                <button
                  type="button"
                  onClick={() => deleteNote(note.id)}
                  className="w-32 h-8 rounded border border-purple-300 text-white bg-purple-300
                  hover:bg-transparent hover:text-purple-300 transition duration-200 ease-in">
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => updateNote(note.id)}
                  className="w-32 h-8 rounded border border-purple-300 text-white bg-purple-300
                  hover:bg-transparent hover:text-purple-300 transition duration-200 ease-in">
                  Update
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  );
}

export default Notes;