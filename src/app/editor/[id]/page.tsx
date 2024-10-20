import { Metadata } from "next";
import AddButton from "@/components/editor/addButton";

export const metadata: Metadata = {
  title: "CollabCal • Editor",
  description: "dashboard"
}

export default function Editor({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <AddButton path={id} />
    </>
  );
}