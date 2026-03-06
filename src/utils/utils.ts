export function formatDate(date: Date = new Date()): string {
    return new Intl.DateTimeFormat("sv-SE").format(date);
}
