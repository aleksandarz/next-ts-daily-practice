import { NextRequest, NextResponse } from "next/server";
import { messages } from "@/app/data/messages";

export async function GET() {
  try {
    return NextResponse.json(
      {
        success: true,
        data: messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "There was an error trying to fetch messages.",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, message } = body;

    if (!name || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || typeof message !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid data format"
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Success",
      },
      { status: 201 }
    );

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}

