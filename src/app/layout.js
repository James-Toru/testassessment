import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog',
  description: 'A React application that interfaces with the JSONPlaceholder API to facilitate Create, Read, Update, and Delete (CRUD) operations on posts. ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
