import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`https://randomuser.me/api/`);
    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to fetch user data",
        },
        { status: 502 } // Bad Gateway
      );
    }

    const user = await res.json();

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error"
      },
      { status: 500 }
    );
  }
}