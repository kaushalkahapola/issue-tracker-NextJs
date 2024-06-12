import { signOut } from "next-auth/react"
import { Button } from "@radix-ui/themes"
import React from "react"
 
export function SignOut({size}: {size: "1" | "2"|" 3"| "4"}) {
  return <Button size={size as "1" | "2" | "3" | "4"} onClick={() => signOut()}>Signout</Button>
}