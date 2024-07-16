"use client";

import React from "react";
import { useSession } from "next-auth/react";

export function Profile() {
  const { data } = useSession();

  if (!data?.user) return <h1>Please sign in to see your profile</h1>;

  return <h1>Welcome</h1>;
}
