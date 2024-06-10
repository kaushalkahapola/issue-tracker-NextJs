import Link from 'next/link'
import React from 'react'
import { IoIosBug } from "react-icons/io";


const NavBar = () => {

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
            {links.map((link, index) => <Link key={index} href={link.path}>{link.label}</Link>)}
        </ul>
    </nav>
  )
}

export default NavBar