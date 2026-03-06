export function getTodayDate() {
    return new Intl.DateTimeFormat("sv-SE").format(new Date());
}
