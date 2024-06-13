import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/prisma/client"


const issuesPattern = new RegExp('^/issues(/new|/[a-zA-Z0-9-]+/edit)?$');


export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  session:{
    strategy: 'jwt',
  },
  callbacks:{
    authorized({request, auth}){
      const {pathname} = request.nextUrl;
      if(!issuesPattern.test(pathname)){
         return true;
      } 
      return !!auth;
    }
  }
}satisfies NextAuthConfig)
