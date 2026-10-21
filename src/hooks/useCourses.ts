import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {courseService} from "../services/courseService.ts";
import type {Course, CourseData} from "../types/course.ts";
import {useNavigate} from "react-router";
import type {AxiosError} from "axios";
import {useToastContext} from "./useToast.ts";
import type {PaginatedResponse} from "../types/pagination.ts";
import {usePagination} from "./usePagination.ts";

export function useCourses() {
    const {getPage, setPage} = usePagination();
    const currentPage = getPage('all-courses');

    const query = useQuery<PaginatedResponse<Course>>({
        queryKey: ['courses', currentPage],
        queryFn: () => courseService.getCourses(currentPage),
    });

    const setCurrentPage = (page: number) => {
        setPage('all-courses', page);
    };

    return {...query, currentPage, setCurrentPage};
}

export function useUserCourses() {
    const {getPage, setPage} = usePagination();
    const currentPage = getPage('user-courses');

    const query = useQuery<PaginatedResponse<Course>>({
        queryKey: ['courses', 'user', currentPage],
        queryFn: () => courseService.getUserCourses(currentPage),
    });

    const setCurrentPage = (page: number) => {
        setPage('user-courses', page);
    };

    return {...query, currentPage, setCurrentPage};
}

export function useCourse(courseId: number) {
    return useQuery<Course>({
        queryKey: ['courses', 'show', courseId],
        queryFn: () => courseService.getCourseById(courseId),
        enabled: !!courseId,
    });
}

export function useCreateCourse() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {addToast, updateToast} = useToastContext();

    return useMutation<
        Course,
        AxiosError<{ errors?: Record<string, string[]> }>,
        CourseData,
        { toastId: string }
    >({
        mutationKey: ['courses', 'create'],
        mutationFn: (data) => courseService.createCourse(data),
        onMutate: async () => {
            const toastId = addToast('Создаем курс...', 'loading');
            return {toastId};
        },
        onSuccess: (_, __, context) => {
            queryClient.removeQueries({queryKey: ['courses']});
            updateToast(context.toastId, {message: 'Курс успешно создан!', type: 'success'});
            navigate('/courses');
        },
        onError: (_, __, context) => {
            if (context?.toastId) {
                updateToast(context.toastId, {
                    message: 'Произошла ошибка при создании курса. Попробуйте позже',
                    type: 'danger',
                });
            }
        },
    });
}

export function useUpdateCourse(courseId: number) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {addToast} = useToastContext();
    const {getPage} = usePagination();

    return useMutation<
        Course,
        AxiosError<{ errors?: Record<string, string[]> }>,
        CourseData,
        { previousCourses: PaginatedResponse<Course> | undefined }
    >({
        mutationKey: ['courses', 'update', courseId],
        mutationFn: (data) => courseService.updateCourse(courseId, data),
        onMutate: async (newCourseData) => {
            const currentPage = getPage('all-courses');
            await queryClient.cancelQueries({queryKey: ['courses']});
            const previousCourses = queryClient.getQueryData<PaginatedResponse<Course>>(['courses', currentPage]);

            queryClient.setQueryData<PaginatedResponse<Course>>(['courses', currentPage], (old) => {
                if (!old) return old;

                return {
                    ...old,
                    data: old.data.map(c =>
                        c.id === courseId
                            ? {...c, name: newCourseData.name, total_tasks: newCourseData.total_tasks}
                            : c
                    ),
                };
            });

            return {previousCourses};
        },
        onSuccess: (updatedCourse) => {
            queryClient.removeQueries({queryKey: ['courses', 'user']});
            queryClient.setQueryData<Course>(['courses', 'show', courseId], updatedCourse);
            addToast('Курс успешно обновлен!', 'success');
            navigate('/courses');
        },
        onError: (_, __, context) => {
            queryClient.setQueryData<PaginatedResponse<Course>>(['courses', getPage('all-courses')], context?.previousCourses);
            addToast('Произошла ошибка при обновлении курса. Попробуйте позже', 'danger');
        },
    });
}

export function useDeleteCourse(courseId: number) {
    const queryClient = useQueryClient();
    const {addToast, updateToast} = useToastContext();
    const {getPage} = usePagination();

    return useMutation<
        void,
        AxiosError<{ errors?: Record<string, string[]> }>,
        void,
        { toastId: string, currentPage: number, previousCourses: PaginatedResponse<Course> | undefined }
    >({
        mutationKey: ['courses', 'delete', courseId],
        mutationFn: () => courseService.deleteCourse(courseId),
        onMutate: async () => {
            const toastId = addToast('Удаляем курс...', 'loading');
            const currentPage = getPage('all-courses');

            await queryClient.cancelQueries({queryKey: ['courses']});
            const previousCourses = queryClient.getQueryData<PaginatedResponse<Course>>(['courses', currentPage]);

            queryClient.setQueryData<PaginatedResponse<Course>>(['courses', currentPage], (old) => {
                if (!old) return old;

                return {
                    ...old,
                    data: old.data.map(c => c.id === courseId ? {...c, isDeleting: true} : c),
                };
            });

            return {toastId, currentPage, previousCourses};
        },
        onSuccess: (_, __, context) => {
            queryClient.invalidateQueries({queryKey: ['courses', context.currentPage]});
            queryClient.removeQueries({queryKey: ['courses', 'user']});

            queryClient.removeQueries({
                queryKey: ['courses'],
                predicate: (query) => {
                    const key = query.queryKey[1];
                    return typeof key === 'number' && key !== context.currentPage;
                },
            });

            updateToast(context.toastId, {
                message: 'Курс успешно удален!',
                type: 'success',
            });
        },
        onError: (_, __, context) => {
            if (context?.previousCourses) {
                queryClient.setQueryData<PaginatedResponse<Course>>(['courses', context.currentPage], context.previousCourses);
            }

            if (context?.toastId) {
                updateToast(context.toastId, {
                    message: 'Произошла ошибка при удалении. Попробуйте позже',
                    type: 'danger',
                });
            }
        },
    });
}

export function useJoinCourse(courseId: number) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {addToast} = useToastContext();
    const {getPage} = usePagination();

    return useMutation<
        Course,
        AxiosError<{ errors?: Record<string, string[]> }>,
        void,
        { previousCourses: PaginatedResponse<Course> | undefined }
    >({
        mutationKey: ['courses', 'join', courseId],
        mutationFn: () => courseService.joinCourse(courseId),
        onMutate: async () => {
            const currentPage = getPage('all-courses');
            await queryClient.cancelQueries({queryKey: ['courses']});
            const previousCourses = queryClient.getQueryData<PaginatedResponse<Course>>(['courses', currentPage]);

            queryClient.setQueryData<PaginatedResponse<Course>>(['courses', currentPage], (old) => {
                if (!old) return old;

                return {
                    ...old,
                    data: old.data.map(c => c.id === courseId ? {...c, has_course: true} : c),
                };
            });

            return {previousCourses};
        },
        onSuccess: () => {
            queryClient.removeQueries({queryKey: ['courses', 'user']});
            addToast('Вы присоединились к курсу!', 'success');
            navigate('/courses');
        },
        onError: (_, __, context) => {
            queryClient.setQueryData<PaginatedResponse<Course>>(['courses', getPage('all-courses')], context?.previousCourses);
            addToast('Произошла ошибка при присоединении к курсу. Попробуйте позже', 'danger');
        },
    });
}

export function useLeaveCourse(courseId: number) {
    const queryClient = useQueryClient();
    const {addToast, updateToast} = useToastContext();
    const {getPage} = usePagination();

    return useMutation<
        void,
        AxiosError<{ errors?: Record<string, string[]> }>,
        void,
        { toastId: string, currentPage: number, previousUserCourses: PaginatedResponse<Course> | undefined }
    >({
        mutationKey: ['courses', 'leave', courseId],
        mutationFn: () => courseService.leaveCourse(courseId),
        onMutate: async () => {
            const toastId = addToast('Выходим из курса...', 'loading');
            const currentPage = getPage('user-courses');

            await queryClient.cancelQueries({queryKey: ['courses']});
            const previousUserCourses = queryClient.getQueryData<PaginatedResponse<Course>>(['courses', 'user', currentPage]);

            queryClient.setQueryData<PaginatedResponse<Course>>(['courses', 'user', currentPage], (old) => {
                if (!old) return old;

                return {
                    ...old,
                    data: old.data.map(c => c.id === courseId ? {...c, isDeleting: true} : c),
                };
            });

            return {toastId, currentPage, previousUserCourses};
        },
        onSuccess: (_, __, context) => {
            queryClient.invalidateQueries({queryKey: ['courses', 'user', context.currentPage]});

            queryClient.removeQueries({
                queryKey: ['courses', 'user'],
                predicate: (query) => {
                    const key = query.queryKey[2];
                    return typeof key === 'number' && key !== context.currentPage;
                },
            });

            updateToast(context.toastId, {
                message: 'Вы вышли из курса!',
                type: 'success',
            });
        },
        onError: (_, __, context) => {
            if (context?.previousUserCourses) {
                queryClient.setQueryData<PaginatedResponse<Course>>(['courses', 'user', context.currentPage], context.previousUserCourses);
            }

            addToast('Произошла ошибка при выходе из курса. Попробуйте позже', 'danger');
        },
    });
}

export function useAddCompletedTask(courseId: number) {
    const queryClient = useQueryClient();
    const {addToast} = useToastContext();
    const {getPage} = usePagination();

    return useMutation<
        Course,
        AxiosError<{ errors?: Record<string, string[]> }>,
        void,
        { previousUserCourses: PaginatedResponse<Course> | undefined }
    >({
        mutationKey: ['courses', 'add', courseId],
        mutationFn: () => courseService.completeTask(courseId),
        onMutate: () => {
            const currentPage = getPage('user-courses');
            const previousUserCourses = queryClient.getQueryData<PaginatedResponse<Course>>(['courses', 'user', currentPage]);

            queryClient.setQueryData<PaginatedResponse<Course>>(['courses', 'user', currentPage], (old) => {
                if (!old) return old;

                return {
                    ...old,
                    data: old.data.map(c =>
                        c.id === courseId
                            ? {...c, completed_tasks: c.completed_tasks + 1}
                            : c
                    ),
                };
            });

            return {previousUserCourses};
        },
        onError: (_, __, context) => {
            queryClient.setQueryData<PaginatedResponse<Course>>(['courses', 'user', getPage('user-courses')], context?.previousUserCourses);
            addToast('Произошла ошибка. Попробуйте позже', 'danger');
        },
    });
}

export function useRemoveCompletedTask(courseId: number) {
    const queryClient = useQueryClient();
    const {addToast} = useToastContext();
    const {getPage} = usePagination();

    return useMutation<
        Course,
        AxiosError<{ errors?: Record<string, string[]> }>,
        void,
        { previousUserCourses: PaginatedResponse<Course> | undefined }
    >({
        mutationKey: ['courses', 'remove', courseId],
        mutationFn: () => courseService.uncompleteTask(courseId),
        onMutate: () => {
            const currentPage = getPage('user-courses');
            const previousUserCourses = queryClient.getQueryData<PaginatedResponse<Course>>(['courses', 'user', currentPage]);

            queryClient.setQueryData<PaginatedResponse<Course>>(['courses', 'user', currentPage], (old) => {
                if (!old) return old;

                return {
                    ...old,
                    data: old.data.map(c =>
                        c.id === courseId
                            ? {...c, completed_tasks: c.completed_tasks - 1}
                            : c
                    ),
                };
            });

            return {previousUserCourses};
        },
        onError: (_, __, context) => {
            queryClient.setQueryData<PaginatedResponse<Course>>(['courses', 'user', getPage('user-courses')], context?.previousUserCourses);
            addToast('Произошла ошибка. Попробуйте позже', 'danger');
        },
    });
}
