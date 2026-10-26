import api from "../lib/axios.ts";
import type {EventInput} from "@fullcalendar/react";

export const eventService = {
    getEvents: async () => {
        const res = await api.get<EventInput[]>('/events');
        return res.data;
    },
    createEvent: async (data: EventInput) => {
        const res = await api.post<EventInput>('/events', data);
        return res.data;
    },
    updateEvent: async (eventId: number, data: EventInput) => {
        const res = await api.patch<EventInput>(`/events/${eventId}`, data);
        return res.data;
    },
    deleteEvent: async (eventId: number) => {
        await api.delete<void>(`/events/${eventId}`);
    },
};
