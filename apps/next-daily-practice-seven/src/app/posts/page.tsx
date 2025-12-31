import { blogPosts } from "@/app/posts/data";

const PostsPage = () => {
  return (
    <>
      <div className="flex flex-col gap-3 min-w-full items-center mt-10">
        {blogPosts.map((post) => (
          <div
            className="h-fit w-1/4 flex flex-col items-center p-10 border-b-2 border-gray-300"
            key={post.id}>
            <h2 className="text-xl mb-3 font-semibold">{post.title}</h2>
            <p className="text-center">{post.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default PostsPage;