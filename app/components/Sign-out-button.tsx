import { signOut } from "next-auth/react"
import { Button } from "@radix-ui/themes"
import React from "react"
 
export function SignOut() {
  return <Button onClick={() => signOut()}>Signout</Button>
}