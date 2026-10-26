import {useMutation, useQuery} from "@tanstack/react-query";
import {eventService} from "../services/eventService.ts";
import type {EventInput} from "@fullcalendar/react";
import type {AxiosError} from "axios";
import {useOptimisticUpdate} from "./useOptimisticUpdate.ts";

export function useEvents() {
    return useQuery({
        queryKey: ['events'],
        queryFn: () => eventService.getEvents(),
        staleTime: Infinity,
        gcTime: Infinity,
    });
}

export function useCreateEvent() {
    const {invalidateQueries} = useOptimisticUpdate();

    return useMutation<
        EventInput,
        AxiosError<{ errors?: Record<string, string[]> }>,
        EventInput
    >({
        mutationKey: ['events', 'create'],
        mutationFn: (data) => eventService.createEvent(data),
        onSettled: () => {
            invalidateQueries(['events']);
        },
    });
}

export function useUpdateEvent() {
    const {invalidateQueries} = useOptimisticUpdate();

    return useMutation<
        EventInput,
        AxiosError<{ errors?: Record<string, string[]> }>,
        { eventId: number, data: EventInput }
    >({
        mutationKey: ['events', 'update'],
        mutationFn: ({eventId, data}) => eventService.updateEvent(eventId, data),
        onSettled: () => {
            invalidateQueries(['events']);
        },
    });
}

export function useDeleteEvent() {
    const {invalidateQueries} = useOptimisticUpdate();

    return useMutation<
        void,
        AxiosError<{ errors?: Record<string, string[]> }>,
        number
    >({
        mutationKey: ['events', 'delete'],
        mutationFn: (eventId: number) => eventService.deleteEvent(eventId),
        onSettled: () => {
            invalidateQueries(['events']);
        },
    });
}
