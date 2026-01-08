import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const greetingName = name || "Stranger";

  return NextResponse.json({
    message: `Hello ${greetingName}!`
  });
}