import './globals.css'
import { Montserrat } from 'next/font/google'
import { DataProvider } from "./contexts/Datacontexts"

//Components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'AnyPost',
  description: 'A React application that interfaces with the JSONPlaceholder API to facilitate Create, Read, Update, and Delete (CRUD) operations on posts. ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <DataProvider>
          <Navbar/>
          {children}
          <Footer/>
        </DataProvider>
      </body>
    </html>
  )
}
