import create from "zustand";
import { createClient } from "@liveblocks/client";
import { liveblocks } from "@liveblocks/zustand";
import type { WithLiveblocks } from "@liveblocks/zustand";
import { Label } from "@prisma/client";

import { Task, User } from "../types";

type State = {
    userData: User;
    setUserData: (userData: User) => void;
    selected: string;
    setSelected: (selected: string) => void;
    dateId: string;
    setDateId: (dateId: string) => void;
    tasks: Task[];
    setTasks: (task: Task[]) => void;
    addTask: (task: Task) => void;
    checkTask: (id: string, newState: boolean) => void;
    renameTask: (id: string, text: string) => void;
    changeLabel: (id: string, label: Label) => void;
    deleteTask: (id: string) => void;
};

const client = createClient({
    publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY as string,
});

export const useStore = create<WithLiveblocks<State>>()(
    liveblocks((set) => ({
        userData: {
            name: null,
            image: null,
            id: "",
            label: "RED",
        },
        setUserData: (userData: User) => set({ userData }),
        selected: "",
        setSelected: (selected: string) => set({ selected }),
        dateId: "",
        setDateId: (dateId: string) => set({ dateId }),
        tasks: [],
        setTasks: (tasks: Task[]) => set({ tasks }),
        addTask: (task: Task) => set((state: { tasks: Task[] }) => ({ tasks: [...state.tasks, task] })),
        checkTask: (id: string, newState: boolean) =>
            set((state: { tasks: Task[] }) => ({
                tasks: state.tasks.map((task) =>
                task.id === id ? { ...task, checked: newState } : task
                ),
            })
        ),
        renameTask: (id: string, text: string) =>
            set((state: { tasks: Task[] }) => ({
                tasks: state.tasks.map((task) =>
                task.id === id ? { ...task, text } : task
                ),
            })
        ),
        changeLabel: (id: string, label: Label) =>
            set((state: { tasks: Task[] }) => ({
                tasks: state.tasks.map((task) =>
                task.id === id ? { ...task, label } : task
                ),
            })
        ),
        deleteTask: (id: string) =>
            set((state: { tasks: Task[] }) => ({
                tasks: state.tasks.filter((task) => task.id !== id),
            })
        )
    }),
    {
        client,
        presenceMapping: {
            userData: true,
            selected: true,
        },
        storageMapping: {
            tasks: true,
            dateId: true,
        },
    })
);