"use server";

import type { Post } from "@prisma/client";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/db";
import paths from "@/utils/paths";
import { auth } from "@/auth";

interface ICreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

const postSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

export async function createPost(
  slug: string,
  formState: ICreatePostFormState,
  formData: FormData,
): Promise<ICreatePostFormState> {
  const session = await auth();
  const result = postSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) return { errors: result.error.flatten().fieldErrors };
  // Revalidate topic show page

  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be logged in to do this."],
      },
    };
  }

  let post: Post;

  try {
    const topic = await db.topic.findUnique({
      where: {
        slug,
      },
    });

    if (!topic?.id) throw new Error("Cannot find topic.");

    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) return { errors: { _form: [error.message] } };

    return { errors: { _form: ["Failed to create a post.  "] } };
  }

  revalidatePath(paths.topicShow(slug));
  redirect(paths.postShow(slug, post.id));
}
