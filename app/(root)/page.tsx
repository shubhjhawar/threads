"use server";

import { currentUser } from "@clerk/nextjs";
import { fetchThreads } from "@/lib/actions/thread.actions";
import ThreadCard from "../../components/cards/ThreadCard";

export default async function Home() {
  const result = await fetchThreads(1, 30);
  const user = await currentUser();

  return (
    <div>
      <h1 className='head-text text-left'>Home</h1>
      {/* <UserButton afterSignOutUrl="/"/> */}

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
            <p className="no-result"></p>
          ) : (
            <>
              {result.posts.map((post) => (
                <ThreadCard 
                  key = {post._id}
                  id = {post._id}
                  currentUserId = {user?.id || ""}
                  parentId = {post.parentId}
                  content = {post.text}
                  author = {post.author}
                  community = {post.community}
                  createdAt = {post.createdAt}
                  comments = {post.children }
                />
              ))}
            </>
          )}
      </section>
    </div>
  )
}