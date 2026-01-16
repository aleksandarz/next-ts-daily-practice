import { PostsType } from "@/app/components/NewsClient";

export const fetchNews = async (): Promise<PostsType[]> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error while loading: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Fetch news failed:", err);
    throw err;
  }
};

export const fetchNewsById = async (id: string): Promise<PostsType> => {
  if (!id.trim() || isNaN(Number(id))) {
    throw new Error("Invalid ID");
  }

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Greška: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Fetch by ID failed:", err);
    throw err;
  }
};