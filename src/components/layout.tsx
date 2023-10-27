import Navbar from './navbar'
import Footer from './footer'
import { ReactNode } from 'react';
 
type Props = {
    children:ReactNode;
}

export default function Layout({ children }:Props) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}