import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
    title: "CollabCal • Not Found",
    description: "not found"
}

export default function NotFound() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center sm:p-24 xs:p-12 p-6">
      <h1 className="text-center text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-300 to-neutral-900 py-3">
        404 - Not Found
      </h1>
      <div className="text-base text-center sm:text-lg text-muted-foreground mb-8">
        Looks like you&apos;re lost.
      </div>
      <div className="space-x-4 flex items-center">
        <Link href="/">
            <Button>
              Go To Home <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
        </Link>
      </div>
    </main>
  )
}