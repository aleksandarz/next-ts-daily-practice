import { NextResponse, NextRequest } from "next/server";
import { MoviesType } from "@/app/types";
import { movies } from "@/app/data/movies";

export async function GET() {
  try {
    const data: MoviesType[] = movies;

    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch movies",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, year } = body;

    if (!title || title.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          message: "Title is required",
        },
        { status: 400 }
      );
    }

    if (year === undefined || year === null) {
      return NextResponse.json(
        {
          success: false,
          message: "Year is required",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Movie is added to the watchlist",
      },
      { status: 201 }
    );

  } catch (err) {
    console.error(err);
  }
}