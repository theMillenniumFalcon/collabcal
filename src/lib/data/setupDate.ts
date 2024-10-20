import prisma from "@/lib/prisma";
import { Date, MonthView, Task } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

export const setupDate = async ({
    day,
    month,
    year,
    view,
}: {
    day: string;
    month: string;
    year: string;
    view: MonthView & {
        dates: (Date & {
        tasks: Task[];
        })[];
    };
}) => {
    const user = auth();

    const existingDate = view.dates.find((date) => date.day === parseInt(day));
    if (existingDate) {
        return existingDate;
    }

    const org = user.orgId === undefined || user.orgId === null ? false : true;
    const id = org ? user.orgId : user.userId;

    const newDateData = await prisma.date.create({
        data: {
            day: parseInt(day),
            month: parseInt(month),
            year: parseInt(year),
            user: id!,
            viewId: view.id,
        },
        include: {
            tasks: true,
        },
    });

    return newDateData;
};