import { TopicCreateForm } from "../components/topics/topic-create-form";

import PostList from "@/components/posts/post-list";
import { TopicList } from "@/components/topics/topic-list";
import { db } from "@/db";
import { fetchTopPosts } from "@/db/queries/posts";

export default async function Home() {
  const topics = await db.topic.findMany();

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top posts</h1>
        <PostList fetchData={() => fetchTopPosts()} />
      </div>
      <div className="border shadow py-3 px-2">
        <TopicCreateForm />
        <h3 className="text-lg mt-2">Topics</h3>
        <TopicList topics={topics} />
      </div>
    </div>
  );
}
