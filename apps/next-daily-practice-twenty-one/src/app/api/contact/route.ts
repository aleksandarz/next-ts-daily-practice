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

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: "Name is required and must be at least 2 characters",
        },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is not valid",
        },
        { status: 400 }
      )
    }

    if (!message || message.trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          message: "Message is required and must be at least 10 characters",
        },
        { status: 400 }
      )
    }

    console.log("Received data:", { name, email, message });

    return NextResponse.json(
      {
        success: true,
        message: "Thanks, your message has been sent successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong on our side. Please try again in a few moments",
      },
      { status: 500 }
    );
  }
};
