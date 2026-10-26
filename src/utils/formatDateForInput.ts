export const formatDateForInput = (date: Date | null) => {
    if (!date) return undefined;
    return date.toISOString().slice(0, 16);
}
