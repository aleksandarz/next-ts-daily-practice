import NewsClient, { PostsType } from "@/app/components/NewsClient";
import { fetchNews } from "@/app/api/fetchNews";
import SearchNews from "@/app/components/SearchNews";
import NewsContent from "@/app/components/NewsContent";

export default async function Home() {
  let news: PostsType[] = [];
  let serverError: string | null = null;

  try {
    news = await fetchNews();
  } catch (err) {
    serverError = "We couldn't load news from the server. Check your connection or try again later.";
    console.error("Server fetch failed:", err);
  }

  return (
    <>
      <main>
        <SearchNews />
        <NewsContent />
        <NewsClient
          news={news}
          initialError={serverError}/>
      </main>
    </>
  );
}
