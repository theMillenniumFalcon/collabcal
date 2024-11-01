import "./globals.css"
import { DM_Sans } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { cn } from "@/utils/cn"

const dm = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] })

export const metadata = {
  title: "CollabCal",
  description: "Multiplayer Calendar Planning",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const c = cn("dark", dm.className)

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
      afterSignOutUrl="/"
    >
      <html lang="en">
        <body className={c}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}