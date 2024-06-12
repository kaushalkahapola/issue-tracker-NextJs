'use client';
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import { IoIosBug } from "react-icons/io";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { auth } from "../auth"
import { Box } from '@radix-ui/themes';
import { SignIn } from './components/Sign-in-button';
import {SignOut} from './components/Sign-out-button'
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';


const NavBar = () => {

  const pathname = usePathname()
  const {status, data: Session} = useSession()

  const links = [
    {
      label: 'Dashboard',
      path: '/'
    },
    {
      label: 'Issues',
      path: '/issues'
    }
  ]

  return (
    <nav className='flex space-x-6 border-b h-14 items-center mb-6 px-6'>
        <Link href='/'><IoIosBug/></Link>
        <ul className='flex space-x-6'>
            {links.map((link, index) => <li> <Link key={index} href={link.path} className={
              classNames({
                'text-zinc-500' : pathname !== link.path,
                'text-zinc-900' : pathname === link.path,
                'hover:text-zinc-800' : true,
                'transition-colors' : true
              })
            }>{link.label}</Link></li>)}
        </ul>
        <Box>
          {status == 'authenticated' && <SignOut />}
          {status == 'unauthenticated' && <SignIn />}
        </Box>
    </nav>
  )
}

export default NavBar