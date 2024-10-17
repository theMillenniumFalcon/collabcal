import { redirect } from "next/navigation";

import DateSelect from "@/components/calendar/dateSelect";
import HelpButton from "@/components/calendar/helpButton";

export default async function Dashboard({
  params,
}: {
  params: { month: string; year: string };
}) {
  const { month, year } = params;

  validateRoute(params);

  return (
    <div className="w-screen md:px-8 xs:px-5 px-3 md:py-8 xs:py-6 py-5 bg-muted flex-grow flex flex-col">
      <div className="flex w-full justify-between items-center">
        <DateSelect month={parseInt(month)} year={parseInt(year)} />
        <HelpButton />
      </div>
    </div>
  );
}

const validateRoute = (params: { month: string; year: string }) => {
  const { month, year } = params;

  const d = new Date();
  const currentYear = d.getFullYear();
  const currentMonth = (d.getMonth() + 1).toString().padStart(2, "0");

  // if the year is not a number or under 1000 or over 9999, redirect to current
  if (isNaN(parseInt(year)) || parseInt(year) < 1000 || parseInt(year) > 9999) {
    redirect(`/dashboard/${currentYear}/${currentMonth}`);
  }

  // if the month is not a number or under 1 or over 12, redirect to current
  if (isNaN(parseInt(month)) || parseInt(month) < 1 || parseInt(month) > 12) {
    redirect(`/dashboard/${currentYear}/${currentMonth}`);
  }
};