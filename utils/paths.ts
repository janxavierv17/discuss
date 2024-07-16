const paths = {
  home() {
    return `/`;
  },
  topicShow(topicSlug: string) {
    return `/topics/${topicSlug}`;
  },
  postCreate(postSlug: string) {
    return `/topics/${postSlug}/posts/new`;
  },
  postShow(postSlug: string, postId: string) {
    return `/topics/${postSlug}/posts/${postId}`;
  },
};

export default paths;

// Time-based (seconds)
// export const revalidate = 3

// On demand - Purge cache forcibly.
// import {revalidatePath} from "next/cache"
// revalidatePath("./snippets")
