"use client";

import { Input } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

import * as actions from "@/actions";

export default function SearchInput() {
  const params = useSearchParams();

  return (
    <form action={actions.search}>
      <Input defaultValue={params.get("term") || ""} name="term" />
    </form>
  );
}
