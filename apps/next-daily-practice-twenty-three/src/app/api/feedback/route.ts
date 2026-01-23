import { NextResponse, NextRequest } from "next/server";
import { feedbackData } from "@/app/data/feedbackData";
import { Feedback } from "@/app/types";

export async function GET() {
  try {
    const data: Feedback[] = feedbackData;

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch feedback",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest){
  try {
    const body = await req.json();
    const { id, name, rating, comment } = body;

    if (!id || !name || rating === undefined || !comment) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (typeof id !== "string" ||
      typeof name !== "string" ||
      typeof rating !== "number" ||
      typeof comment !== "string") {
      return NextResponse.json(
        { success: false, message: "Field types are not valid" },
        { status: 400 }
      );
    }

    if (name.length < 3) {
      return NextResponse.json(
        { success: false, message: "Name must be at least 3 characters" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: "Rating must be within 1 and 5" },
        { status: 400 }
      );
    }

    if (comment.length === 0) {
      return NextResponse.json(
        { success: false, message: "Comment is required" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Success" },
      { status: 201 }
    );

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch feedback" },
      { status: 500 }
    );
  }
}
