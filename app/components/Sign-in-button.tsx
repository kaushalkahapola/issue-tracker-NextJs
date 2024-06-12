import { signIn } from "next-auth/react"
import { Button } from "@radix-ui/themes"
 
export function SignIn() {
  return <Button onClick={() => signIn()}>Sign In</Button>
}