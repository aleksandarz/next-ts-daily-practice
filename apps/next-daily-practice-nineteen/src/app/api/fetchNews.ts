import { PostsType } from "@/app/components/NewsClient";

export const fetchNews = async (): Promise<PostsType[]> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error while fetching: ${response.status} ${response.statusText}`);
    }

    const data: PostsType[] = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch news failed:", err);
    throw err;
  }
};