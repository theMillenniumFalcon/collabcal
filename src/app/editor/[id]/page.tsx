import { Metadata } from "next";
import AddButton from "@/components/editor/addButton";
import Items from "@/components/editor/items";

export const metadata: Metadata = {
  title: "CollabCal • Editor",
  description: "dashboard"
}

export default function Editor({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <Items path={id} />
      <AddButton path={id} />
    </>
  );
}