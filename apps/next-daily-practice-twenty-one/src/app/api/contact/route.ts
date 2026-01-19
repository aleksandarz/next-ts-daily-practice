"use server";

import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

export const POST = async (req: NextRequest) => {
  try {
    const body: ContactPayload = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    console.log("Received data:", { name, email, message });

    return NextResponse.json(
      {
        message: "Data received successfully",
        submittedData: { name, email, message },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 500 }
    );
  }
};
