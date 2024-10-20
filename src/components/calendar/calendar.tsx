"use client";

import React from "react";
import { Date, MonthView, Task } from "@prisma/client";

import { daysInMonth } from "@/utils/daysInMonth";
import { emptyEndDays } from "@/utils/emptyEndDays";
import { emptyStartDays } from "@/utils/emptyStartDays";
import DateBox from "./dateBox";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar({
  month,
  year,
  view,
}: {
  month: number;
  year: number;
  view: MonthView & {
    dates: (Date & {
      tasks: Task[];
    })[];
  };
}) {
  const start = emptyStartDays(month, year);
  const mid = daysInMonth(month, year);
  const end = emptyEndDays(mid, start);

  const viewDates = view.dates;

  return (
    <div
      className="mt-4 z-10 w-full calendar flex-grow relative overflow-hidden flex flex-col gap-[1px] bg-accent p-[2px] rounded-xl"
    >
      <div className="w-full gap-[1px] grid grid-cols-7 mb-[1px] rounded-t-[0.7rem] overflow-hidden">
        {weekDays.map((day, i) => (
          <div
            key={i}
            className="py-3 font-medium bg-background text-neutral-600 w-full text-center"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="w-full gap-[1px] flex-grow grid grid-cols-7 grid-rows-5 rounded-b-[0.7rem] overflow-hidden">
        {start ? (
          <>
            {[...Array(start).keys()].map((x, i) => (
              <DateBox empty={true} key={`start-${i}`} />
            ))}
          </>
        ) : null}
        {mid ? (
          <>
            {[...Array(mid).keys()].map((x, i) => (
              <DateBox
                key={`mid-${i}`}
                empty={false}
                data={viewDates.filter((d) => d.day === i + 1)[0]}
                day={i + 1}
                month={month}
                year={year}
              />
            ))}
          </>
        ) : null}
        {end ? (
          <>
            {[...Array(end).keys()].map((x, i) => (
              <DateBox empty={true} key={`end-${i}`} />
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
}