import FullCalendar, {type DatePointApi, type EventClickInfo, type EventInput} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import themePlugin from "@fullcalendar/react/themes/monarch";
import interactionPlugin from "@fullcalendar/react/interaction";
import ruLocale from "@fullcalendar/react/locales/ru";
import '@fullcalendar/react/skeleton.css';
import '@fullcalendar/react/themes/monarch/theme.css';
import '@fullcalendar/react/themes/monarch/palettes/purple.css';
import {useCreateEvent, useDeleteEvent, useEvents, useUpdateEvent} from "../../hooks/useEvents.ts";
import Modal from "../UI/Modal.tsx";
import {useState} from "react";
import {type SubmitHandler, useForm} from "react-hook-form";
import {handleApiErrors} from "../../utils/handleApiErrors.ts";
import EventForm from "./EventForm.tsx";
import Loader from "../UI/Loader.tsx";
import {convertToIso, formatDateForInput} from "../../utils/formatDate.ts";

export default function MyCalendar() {
    const [isOpenCreate, setIsOpenCreate] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [currentEventId, setCurrentEventId] = useState<number | null>(null);

    const {data: events, isLoading} = useEvents();
    const {mutate: create, isPending: isCreating} = useCreateEvent();
    const {mutate: update, isPending: isUpdating} = useUpdateEvent();
    const {mutate: destroy, isPending: isDeleting} = useDeleteEvent();

    const createForm = useForm<EventInput>();
    const updateForm = useForm<EventInput>();

    const handleDateClick = (info: DatePointApi) => {
        createForm.reset({start: `${info.dateStr}T00:00`});
        setIsOpenCreate(true);
    }

    const handleEventClick = (info: EventClickInfo) => {
        updateForm.reset({
            title: info.event.title,
            start: formatDateForInput(info.event.start),
            end: formatDateForInput(info.event.end),
            color: info.event.color,
        });

        setCurrentEventId(Number(info.event.id));
        setIsOpenUpdate(true);
    }

    const onCreateSubmit: SubmitHandler<EventInput> = (data) => {
        create({
            ...data,
            start: convertToIso(data.start),
            end: convertToIso(data.end),
        }, {
            onSuccess: () => {
                setIsOpenCreate(false);
            },
            onError: (error) => handleApiErrors(error, createForm.setError),
        });
    }

    const onUpdateSubmit: SubmitHandler<EventInput> = (data) => {
        if (!currentEventId) return;

        update({
            eventId: currentEventId, data: {
                ...data,
                start: convertToIso(data.start),
                end: convertToIso(data.end),
            }
        }, {
            onSuccess: () => {
                setIsOpenUpdate(false);
            },
            onError: (error) => handleApiErrors(error, updateForm.setError),
        });
    }

    const handleDelete = () => {
        if (!currentEventId) return;

        destroy(currentEventId, {
            onSuccess: () => {
                setIsOpenUpdate(false);
            },
            onError: (error) => handleApiErrors(error, updateForm.setError),
        });
    }

    if (!events && isLoading) return (
        <div className="flex justify-center">
            <Loader size="lg"/>
        </div>
    );

    return (
        <>
            <Modal
                isOpen={isOpenCreate}
                onClose={() => setIsOpenCreate(false)}
                className="w-md"
            >
                <EventForm
                    title="Добавить событие"
                    form={createForm}
                    onSubmit={onCreateSubmit}
                    isLoading={isCreating}
                />
            </Modal>

            <Modal
                isOpen={isOpenUpdate}
                onClose={() => setIsOpenUpdate(false)}
                className="w-md"
            >
                <EventForm
                    title="Изменить событие"
                    form={updateForm}
                    onSubmit={onUpdateSubmit}
                    onDelete={handleDelete}
                    isLoading={isUpdating || isDeleting}
                />
            </Modal>

            <FullCalendar
                plugins={[themePlugin, dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale={ruLocale}
                events={events}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                selectable={true}
            />
        </>
    );
}
