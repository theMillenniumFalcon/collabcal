import { Label } from "@prisma/client";

export type User = {
    name: string | null | undefined;
    image: string | null | undefined;
    id: string;
    label: Label;
};
  
export type Task = {
    id: string;
    text: string;
    checked: boolean;
    label: Label;
    dateId: string;
};