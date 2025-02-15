import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import SessionProviderWrapper from "../components/SP"
import { ContextProvider } from "../context/context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Skill Stack",
  description: "Connect with YouTube courses and learn effectively"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <SessionProviderWrapper>
            <Navbar />
            {children}
          </SessionProviderWrapper>
        </ContextProvider>


      </body>
    </html>
  )
}



import './globals.css'