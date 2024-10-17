import "./globals.css"
import { DM_Sans } from "next/font/google"
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
      <html lang="en">
        <body className={c}>{children}</body>
      </html>
  )
}