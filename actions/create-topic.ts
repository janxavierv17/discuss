"use server";

import type { Topic } from "@prisma/client";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { auth } from "../auth";

import paths from "@/utils/paths";
import { db } from "@/db";

interface ICreateTopicState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Must be lower letters or dashes without spaces",
    }),
  description: z.string().min(10),
});

export async function createTopic(
  formState: ICreateTopicState,
  formData: FormData,
): Promise<ICreateTopicState> {
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!result.success) return { errors: result.error.flatten().fieldErrors };

  // Revalidate home page
  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to do this."],
      },
    };
  }

  let topic: Topic;

  try {
    const existingTopic = await db.topic.findUnique({
      where: { slug: result.data.name },
    });

    if (existingTopic?.slug)
      throw new Error("A topic with the same name already exist.");

    topic = await db.topic.create({
      data: { slug: result.data.name, description: result.data.description },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } };
    }

    return {
      errors: { _form: ["Something went wrong. Please try again later."] },
    };
  }

  revalidatePath("/");
  redirect(paths.topicShow(topic.slug));
}
