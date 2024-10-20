"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";

import { useUser } from "./context/context.providet";

import { ThemeSwitch } from "@/src/components/theme-switch";

export const Navbar = () => {
  const { user, setSearch, search } = useUser();

  return (
    <NextUINavbar
      className=" fixed top-0 z-50 w-full "
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full  " justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit md:text-2xl">Travel Tips</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 mt-2  justify-center items-center ml-2">
          {user?.data?.role === "USER" && (
            <Link className=" font-titlefont" href="/newsFeed">
              News Feed
            </Link>
          )}

          <Link className=" font-titlefont" href="/contact">
            Contact
          </Link>
          <Link className=" font-titlefont" href="/about">
            About
          </Link>
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex md:gap-5">
          {user?.data?.email && (
            <button onClick={() => setSearch(!search)}>Search</button>
          )}
          <ThemeSwitch />
          {user ? (
            <div>
              {user?.data?.role === "ADMIN" && <Link href="/admin">Admin</Link>}
              {user?.data?.role === "USER" && (
                <Link href="/profile">Profile</Link>
              )}
            </div>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-2" justify="end">
        {user?.data?.email && (
          <button onClick={() => setSearch(!search)}>Search</button>
        )}

        {user?.data?.email ? (
          <Link href="/profile">Profile</Link>
        ) : (
          <Link href="/login">Login </Link>
        )}

        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {user?.data?.role === "USER" && (
            <Link className=" font-titlefont" href="/newsFeed">
              News Feed
            </Link>
          )}
          <Link className=" font-titlefont" href="/about">
            About
          </Link>
          <Link className="t font-titlefont" href="/contact">
            Contact
          </Link>
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
