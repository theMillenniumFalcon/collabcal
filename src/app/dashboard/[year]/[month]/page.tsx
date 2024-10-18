import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import DateSelect from "@/components/calendar/dateSelect";
import HelpButton from "@/components/calendar/helpButton";
import Calendar from "@/components/calendar/calendar";

import { setupView } from "@/lib/data/setupView";

export default async function Dashboard({
  params,
}: {
  params: { month: string; year: string };
}) {
  const { month, year } = params;
  const user = auth();

  console.log("user is:", user)

  validateRoute(params);
  const view = await setupView({ ...params, user });

  return (
    <div className="w-screen md:px-8 xs:px-5 px-3 md:py-8 xs:py-6 py-5 bg-muted flex-grow flex flex-col">
      <div className="flex w-full justify-between items-center">
        <DateSelect month={parseInt(month)} year={parseInt(year)} />
        <HelpButton />
      </div>
      {view ? (
        <Calendar />
      ) : null}
    </div>
  );
}

const validateRoute = (params: { month: string; year: string }) => {
  const { month, year } = params;

  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = (date.getMonth() + 1).toString().padStart(2, "0");

  if (isNaN(parseInt(year)) || parseInt(year) < 1000 || parseInt(year) > 9999) {
    redirect(`/dashboard/${currentYear}/${currentMonth}`);
  }

  if (isNaN(parseInt(month)) || parseInt(month) < 1 || parseInt(month) > 12) {
    redirect(`/dashboard/${currentYear}/${currentMonth}`);
  }
};