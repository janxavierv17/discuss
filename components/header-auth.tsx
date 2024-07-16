"use client";

import React from "react";
import {
  NavbarContent,
  NavbarItem,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Spinner,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

import * as actions from "../actions";

export function HeaderAuth() {
  const session = useSession();

  const isSignedIn =
    session?.status === "authenticated" ? (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={session?.data?.user?.image || ""} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <form action={actions.signOut}>
              <Button type="submit" variant="bordered">
                Sign Out
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    ) : (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button
              color="primary"
              isDisabled={session?.status === "loading"}
              type="submit"
              variant="solid"
            >
              {session?.status === "loading" ? (
                <Spinner color="default" size="md" />
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </NavbarItem>
      </>
    );

  return <NavbarContent justify="end">{isSignedIn}</NavbarContent>;
}
