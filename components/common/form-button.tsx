"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/button";

export const FormButton = ({ children }: { children: React.ReactNode }) => {
  const { pending } = useFormStatus();

  return (
    <Button isLoading={pending} type="submit">
      {children}
    </Button>
  );
};
