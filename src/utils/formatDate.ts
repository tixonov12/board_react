import type {DateInput} from "@fullcalendar/react";

export const formatDateForInput = (date: Date | null) => {
    if (!date) return undefined;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export const convertToIso = (date: DateInput | undefined) => {
    if (!date) return undefined;
    return new Date(date as string).toISOString();
}
