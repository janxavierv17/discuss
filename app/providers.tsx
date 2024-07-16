"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ThemeProviderProps } from "next-themes/dist/types";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();

  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
    </SessionProvider>
  );
}
