import Link from "next/link";
import { Suspense } from "react";

import Loading from "./loading";

type Comment = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// SSR
async function getPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });
  return response.json();
}

export default async function PageList() {
  const postList: Comment[] = await getPosts();

  return (
    <section className="p-3">
      <h1 className="text-2xl font-bold mb-3">URL Fetching SSR</h1>
      <Suspense fallback={<Loading />}>
        <ul>
          {postList.map(({ id, title, body }: Comment) => (
            <li
              className="flex flex-col gap-4 p-4 border border-[#DBDBDB] hover:bg-blue-100 mb-3 rounded-md"
              key={id}
            >
              <Link href={`posts/${id}`}>
                <p className="text-xl font-bold">{title}</p>
                <p className="text-gray-800">{body}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Suspense>
    </section>
  );
}
