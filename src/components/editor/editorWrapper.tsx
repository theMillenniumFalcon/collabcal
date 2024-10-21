"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Date, Task } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { useStore } from "@/lib/state";
import { User } from "@/lib/types";
import { getUserLabel } from "@/utils/getUserLabel";
import { Badge } from "@/components/ui/badge";
import Avatar from "./avatar";

type Empty = {
  modal?: boolean;
  dateString: string;
  children: React.ReactNode;
  empty: true;
};

type Props = {
  dateString: string;
  children: React.ReactNode;
  data: Date & {
    tasks: Task[];
  };
  roomId: string;
  empty: false;
  org: boolean;
};

export default function EditorWrapper(props: Empty | Props) {
  const { dateString, empty, children } = props;

  const {
    liveblocks: { enterRoom, leaveRoom, others, status },
  } = useStore();

  const setUserData = useStore((state) => state.setUserData);
  const setTasks = useStore((state) => state.setTasks);
  const setDateId = useStore((state) => state.setDateId);

  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (empty || !isLoaded || !isSignedIn) return;

    if (!props.org) {
      setTasks(props.data.tasks);
      setDateId(props.data.id);

      return;
    }

    setUserData({
      id: user.id,
      name: user.fullName,
      image: user.imageUrl,
      label: getUserLabel(user.fullName ?? ""),
    });

    enterRoom(props.roomId);

    setTasks(props.data.tasks);
    setDateId(props.data.id);

    return () => {
      leaveRoom();
    };
  }, [enterRoom, leaveRoom, user]);

  return (
    <>
      <div className="flex w-full justify-between items-center">
        <div className="space-x-3 flex items-center">
          <Button size="sm" variant="ghost">
            <Link className="flex items-center" href="/dashboard">
              <ChevronLeft className="w-4 h-4 mr-1 -ml-1" />
                Back
            </Link>
          </Button>
          <div className="text-xl font-bold">{dateString}</div>
        </div>
        {!empty &&
          others.map(({ connectionId, presence }) => {
            const userData = presence?.userData as User;
            if (!userData.name || !userData.image) return null;
            return (
              <Avatar
                name={userData.name}
                key={userData.id}
                src={userData.image}
                color={userData.label}
              />
            );
          })}
      </div>

      {!empty && props.org ? (
        <div className="flex mt-2 w-full space-x-1 items-center">
          {status ? (
            <Badge variant="outline">
              Status: {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          ) : null}
          <Badge className="flex items-center" variant="outline">
            <div className="w-2 h-2 relative mr-1.5">
              <div className="w-2 h-2 bg-green-500/75 animate-ping rounded-full absolute top-0 left-0"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full absolute top-0 left-0"></div>
            </div>
            {others ? others.length + 1 : 1} Active
          </Badge>
        </div>
      ) : null}

      <div className="w-full space-y-2 max-w-screen-sm mt-6">{children}</div>
    </>
  );
}