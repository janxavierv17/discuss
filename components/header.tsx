"use client";

import React from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import { HeaderAuth } from "./header-auth";

import SearchInput from "@/components/search-input";

export function Header() {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link className="font-bold" href="/">
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <SearchInput />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}
