
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

// Components
import NavigationBar from "@/components/navigation-bar"


// Font
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MindSafe | Decentralized Mental Health Support",
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-off-white text-slate-800`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <NavigationBar />
            <main className="flex-1 bg-white">{children}</main>
          </div>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  )
}



import './globals.css'
import Footer from "@/components/footer"
