"use client";

import type { Topic } from "@prisma/client";

import Link from "next/link";
import { Chip } from "@nextui-org/react";

import paths from "@/utils/paths";

export const TopicList = ({ topics }: { topics: Topic[] }) => {
  const renderTopics = topics.map(({ id, slug }) => {
    return (
      <div key={id}>
        <Link href={paths.topicShow(slug)}>
          <Chip color="warning" variant="shadow">
            {slug}
          </Chip>
        </Link>
      </div>
    );
  });

  return <div className="flex flex-row flex-wrap gap-2">{renderTopics}</div>;
};
