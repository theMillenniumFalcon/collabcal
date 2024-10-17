import { redirect } from "next/navigation";

export default function DashboardRedirect() {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");

  redirect(`/dashboard/${year}/${month}`);
}