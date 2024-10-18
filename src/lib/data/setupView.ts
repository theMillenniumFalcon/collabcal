import prisma from "../prisma";
import { AuthObject } from "@clerk/backend";

export const setupView = async (params: {
  month: string;
  year: string;
  user: AuthObject;
}) => {
  const { month, year, user } = params;

  const org = user.orgId === undefined || user.orgId === null ? false : true;
  const viewId = org ? user.orgId : user.userId;

  const monthView = await prisma.monthView.findUnique({
    where: {
      MonthViewId: {
        monthYear: `${year}-${month}`,
        user: viewId!,
      },
    },
    include: {
      dates: {
        include: {
          tasks: true,
        },
      },
    },
  });

  if (monthView) {
    return monthView;
  } else {
    const newMonthView = await prisma.monthView.create({
      data: {
        monthYear: `${year}-${month}`,
        user: viewId!,
        org,
      },
      include: {
        dates: {
          include: {
            tasks: true,
          },
        },
      },
    });
    
    return newMonthView;
  }
};