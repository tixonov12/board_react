import {useMutation, useQuery} from "@tanstack/react-query";
import {eventService} from "../services/eventService.ts";
import type {EventInput} from "@fullcalendar/react";
import type {AxiosError} from "axios";
import {useOptimisticUpdate} from "./useOptimisticUpdate.ts";
import {useToast} from "./useToast.ts";

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
    const {addToast, updateToast} = useToast();

    return useMutation<
        EventInput,
        AxiosError<{ errors?: Record<string, string[]> }>,
        EventInput,
        { toastId: string }
    >({
        mutationKey: ['events', 'create'],
        mutationFn: (data) => eventService.createEvent(data),
        onMutate: () => {
            const toastId = addToast('Добавляем событие...', 'loading');
            return {toastId};
        },
        onSuccess: (_, __, context) => {
            updateToast(context.toastId, {
                message: 'Событие успешно добавлено!',
                type: 'success',
            });
        },
        onError: (_, __, context) => {
            if (context?.toastId) {
                updateToast(context.toastId, {
                    message: 'Не удалось добавить событие. Попробуйте позже',
                    type: 'danger',
                });
            }
        },
        onSettled: () => {
            invalidateQueries(['events']);
        },
    });
}

export function useUpdateEvent() {
    const {invalidateQueries} = useOptimisticUpdate();
    const {addToast, updateToast} = useToast();

    return useMutation<
        EventInput,
        AxiosError<{ errors?: Record<string, string[]> }>,
        { eventId: number, data: EventInput },
        { toastId: string }
    >({
        mutationKey: ['events', 'update'],
        mutationFn: ({eventId, data}) => eventService.updateEvent(eventId, data),
        onMutate: () => {
            const toastId = addToast('Обновляем событие...', 'loading');
            return {toastId};
        },
        onSuccess: (_, __, context) => {
            updateToast(context.toastId, {
                message: 'Событие успешно обновлено!',
                type: 'success',
            });
        },
        onError: (_, __, context) => {
            if (context?.toastId) {
                updateToast(context.toastId, {
                    message: 'Не удалось обновить событие. Попробуйте позже',
                    type: 'danger',
                });
            }
        },
        onSettled: () => {
            invalidateQueries(['events']);
        },
    });
}

export function useDeleteEvent() {
    const {invalidateQueries} = useOptimisticUpdate();
    const {addToast, updateToast} = useToast();

    return useMutation<
        void,
        AxiosError<{ errors?: Record<string, string[]> }>,
        number,
        { toastId: string }
    >({
        mutationKey: ['events', 'delete'],
        mutationFn: (eventId: number) => eventService.deleteEvent(eventId),
        onMutate: () => {
            const toastId = addToast('Удаляем событие...', 'loading');
            return {toastId};
        },
        onSuccess: (_, __, context) => {
            updateToast(context.toastId, {
                message: 'Событие успешно удалено!',
                type: 'success',
            });
        },
        onError: (_, __, context) => {
            if (context?.toastId) {
                updateToast(context.toastId, {
                    message: 'Не удалось удалить событие. Попробуйте позже',
                    type: 'danger',
                });
            }
        },
        onSettled: () => {
            invalidateQueries(['events']);
        },
    });
}
