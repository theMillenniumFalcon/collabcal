"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const toToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");

  return `/dashboard/${year}/${month}`;
};

export default function DateSelect({
  month,
  year,
}: {
  month: number;
  year: number;
}) {
  const router = useRouter();

  const todayLink = toToday();

  const handleMinus = () => {
    if (month === 1) {
      const newMonth = "12";
      const newYear = year.toString();

      router.push(`/dashboard/${newYear}/${newMonth}`);
    } else {
      const newMonth = (month - 1).toString().padStart(2, "0");
      const newYear = year.toString();

      router.push(`/dashboard/${newYear}/${newMonth}`);
    }
  };

  const handlePlus = () => {
    if (month === 12) {
      const newMonth = "01";
      const newYear = year.toString();

      router.push(`/dashboard/${newYear}/${newMonth}`);
    } else {
      const newMonth = (month + 1).toString().padStart(2, "0");
      const newYear = year.toString();

      router.push(`/dashboard/${newYear}/${newMonth}`);
    }
  };

  return (
    <div className="space-x-1 flex items-center justify-center">
      <button
        onClick={handleMinus}
        className="flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent text-accent-foreground"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <div className="text-xl font-bold">
        {months[month - 1]} {year}
      </div>
      <button
        onClick={handlePlus}
        className="flex items-center justify-center h-9 w-9 rounded-md hover:bg-accent text-accent-foreground"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      <Button variant="outline" size="sm">
        <Link href={todayLink}>Today</Link>
      </Button>
    </div>
  );
}