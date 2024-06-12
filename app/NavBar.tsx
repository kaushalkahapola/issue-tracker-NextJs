"use client";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { IoIosBug } from "react-icons/io";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { auth } from "../auth";
import { Box, Container, Flex } from "@radix-ui/themes";
import { SignIn } from "./components/Sign-in-button";
import { SignOut } from "./components/Sign-out-button";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const pathname = usePathname();
  const { status, data: Session } = useSession();

  const links = [
    {
      label: "Dashboard",
      path: "/",
    },
    {
      label: "Issues",
      path: "/issues",
    },
  ];

  return (
    <nav className="border-b mb-6">
      <Container>
        <Flex align='center' py='3' justify='between'>
          <Flex gap='3' align='center'>
            <Link href="/">
              <IoIosBug />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link, index) => (
                <li  key={index}>
                  <Link
                    href={link.path}
                    className={classNames({
                      "text-zinc-500": pathname !== link.path,
                      "text-zinc-900": pathname === link.path,
                      "hover:text-zinc-800": true,
                      "transition-colors": true,
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Flex>
            <Box>
              {status == "authenticated" && <SignOut />}
              {status == "unauthenticated" && <SignIn />}
            </Box>
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
