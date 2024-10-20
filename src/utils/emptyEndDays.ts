export function emptyEndDays(monthDays: number, startDays: number) {
    const baseSum = monthDays + startDays;
    const base = baseSum > 28 ? (baseSum > 35 ? 42 : 35) : 28;
  
    const res = base - monthDays - startDays;
    return res;
}