export function daysInMonth(m: number, y: number) {
    const res = new Date(y, m, 0).getDate();
    return res;
}