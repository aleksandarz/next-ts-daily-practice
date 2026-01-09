import { NextResponse } from "next/server";

const todos: { id: number; text: string }[] = [
  { id: 1, text: "Buy milk" },
  { id: 2, text: "Finish daily practice" },
];

export async function GET() {
  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const { text } = await request.json();

  if (!text || typeof text !== "string" || text.trim() === "") {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  const newTodo = {
    id: Date.now(),
    text: text.trim(),
  };

  todos.push(newTodo);

  return NextResponse.json({ success: true, todo: newTodo }, { status: 201 });
}