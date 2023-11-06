import React from 'react'
import Link from 'next/link'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from './ui/button';
const Navbar = () => {
  return (
    <nav className='flex justify-between items-center border-b border-border h-[60px] px-4 py-2' >
      <Link className='font-bold text-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer' href={'/'} >PageForm</Link>
      <header style={{ display: "flex", justifyContent: "center",gap:"2rem",alignItems:"center"}}>
      <Link className=' text-white bg-gradient-to-r from-indigo-400 via-cyan-400 to-cyan-600 hover:bg-gradient-to-l focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center' href={"/forms"}>View Forms</Link>
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
      
    </header> 
    </nav>
  )
}

export default Navbar;
