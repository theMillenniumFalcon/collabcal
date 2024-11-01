import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="w-screen min-h-screen flex flex-col">
        <div className="bg-background w-screen flex items-center justify-between md:px-8 xs:px-5 px-3 py-2">
          <div className="flex items-center">
            <Link
              href="/dashboard"
              className="hover:opacity-50 transition-all sm:text-xl text-lg font-bold"
            >
              CollabCal
            </Link>
            <div className="sm:mx-4 mx-2 sm:text-2xl text-xl text-muted-foreground">
              /
            </div>
            <div className="pt-1.5">
              <OrganizationSwitcher />
            </div>
          </div>
          <UserButton />
        </div>
        {children}
      </main>
    </>
  );
}