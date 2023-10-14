import Image from "next/image"
import Link from "next/link"
import Logo from "./anypost.png"

export default function Navbar() {
  return (
    <nav>
        <Link href="/">
          <Image 
              src={Logo}
              alt="AnyPost Logo"
              width={70}
              quality={100}
              placeholder="blur"
          />
        </Link>
        <Link href="/">
          <h1>AnyPost</h1>
        </Link>
        <Link href="/">Home</Link>
        <Link href="/create">Create</Link>
        <Link href="/post">Posts</Link>
    </nav>
  )
}
