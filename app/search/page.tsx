import { redirect } from "next/navigation";

import { fetchPostsBySearchTerm } from "@/db/queries/posts";
import PostList from "@/components/posts/post-list";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { term: string };
}) {
  const { term } = searchParams;

  if (!term) redirect("/");

  return (
    <div>
      <PostList fetchData={() => fetchPostsBySearchTerm(term)} />
    </div>
  );
}
