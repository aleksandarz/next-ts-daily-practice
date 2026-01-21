"use client";

import { useEffect, useState } from "react";

type Message = {
  name: string;
  message: string;
};

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/guestbook");

        if (!res.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await res.json();
        setMessages(data.data);
      } catch (err) {
        setError("There was an error loading messages.");
      }
    };

    fetchMessages();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <div className="flex w-full min-h-screen flex-col gap-3 items-center p-10">
        {messages.map((message) => (
          <div
            key={message.name}
            className="flex flex-col gap-2 w-[40rem] p-5 border border-orange-300 rounded">
            <h3 className="text-xl font-semibold">{message.name}</h3>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Messages;
