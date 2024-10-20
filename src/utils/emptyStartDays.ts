export function emptyStartDays(month: number, year: number) {
    const res = (new Date(`${year}-${month.toString().padStart(2, "0")}-01`).getDay()) % 7;
    return res;
}