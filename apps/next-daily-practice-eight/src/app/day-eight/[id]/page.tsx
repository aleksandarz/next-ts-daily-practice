import { posts } from "@/app/day-eight/data";

export type Post = {
  id: string
  title: string
  description: string
}

export const generateStaticParams = async () => {
  const ids = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

  return ids.map(id => ({ id }))
}

export const revalidate = 60

const SinglePostPage = async ({params}: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  const post = posts.find((p) => String(p.id) === id)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-lg">{post.description}</p>
    </div>
  )
}

export default SinglePostPage;

