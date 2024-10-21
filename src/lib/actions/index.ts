"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { Label } from "@prisma/client";

export const createTask = async (id: string, path: string, dateId: string) => {
    await prisma.task.create({
        data: {
            id: id,
            text: "New Task",
            checked: false,
            dateId,
            label: "RED",
        },
    });

    revalidatePath("/editor/" + path);
}

export async function updateTask(itemId: string, text: string) {
    await prisma.task.update({
        where: {
            id: itemId,
        },
        data: {
            text,
        },
    });

    revalidatePath("/dashboard/[id]", "page");
}

export async function relabelTask(itemId: string, label: Label) {
    await prisma.task.update({
        where: {
            id: itemId,
        },
        data: {
            label,
        },
    });

    revalidatePath("/dashboard/[id]", "page");
}

export async function checkTask(itemId: string, newState: boolean) {
    await prisma.task.update({
        where: {
            id: itemId,
        },
        data: {
            checked: newState,
        },
    });

    revalidatePath("/dashboard/[id]", "page");
}

export async function deleteTask(path: string, itemId: string) {
    await prisma.task.delete({
        where: {
            id: itemId,
        },
    });

    revalidatePath("/editor/" + path);
}