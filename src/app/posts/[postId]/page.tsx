import { notFound } from "next/navigation"
import { Suspense } from "react";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string
}

// SSG
async function getPost(postId: string) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + postId, { cache: 'force-cache' });
  if (!res.ok) return undefined
  return res.json()
}

export default async function ProductDetail({ params }: { params: { postId: string } }) {
  const { postId } = await params;

  const post: Post = await getPost(postId);
  if (!post) return notFound();

  return (
    <section className="p-3">
      <h1 className="text-2xl font-bold mb-3">URL Fetching ISR</h1>
    <Suspense fallback={<p>Loading...</p>}>
      <div className="p-3">
        <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
        <p className="text-lg">{post.body}</p>
        <p className="text-lg">{post.userId}</p>
      </div>  
    </Suspense>
    </section>
  )
}
