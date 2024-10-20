import { Label } from "@prisma/client";

export function getUserLabel(user: string) {
    const labels: Label[] = [
      "RED",
      "ORANGE",
      "YELLOW",
      "GREEN",
      "BLUE",
      "PURPLE",
      "PINK",
    ];
  
    if (!user) return labels[0];
    return labels[user.length % labels.length];
}