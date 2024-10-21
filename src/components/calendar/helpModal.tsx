"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { ChevronLeft, Github } from "lucide-react";
import { Button } from "../ui/button";

export default function HelpModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-muted sm:max-w-[550px]">
        <div className="w-full flex items-start flex-col">
          <div className="text-xl font-bold">CollabCal - Project Info</div>

          <div className="w-full space-y-3 text-muted-foreground mt-4">
            <div className="text-sm">
              A real-time calendar app to plan in sync with other users
            </div>
            <div className="text-sm">
              To enable collaboration, create or join an organization (in the
              navbar). Then collaborate with others on individual dates.
            </div>
            <div className="text-sm">
              Built with: Next.js 14, Liveblocks, Clerk, Tailwind, 
              Zustand, Neo, and Prisma.
            </div>
          </div>
          <div className="space-x-2 mt-6">
            <a
              href="https://www.github.com/themillenniumfalcon/collabcal"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="ghost">
                <Github className="h-5 w-5 mr-1.5" />
                Github
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}