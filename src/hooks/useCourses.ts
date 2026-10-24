import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {courseService} from "../services/courseService.ts";
import type {Course, CourseData} from "../types/course.ts";
import {useNavigate} from "react-router";
import type {AxiosError} from "axios";
import {useToast} from "./useToast.ts";
import type {PaginatedResponse} from "../types/pagination.ts";
import {useOptimisticUpdate} from "./useOptimisticUpdate.ts";

export function useCourses() {
    const query = useInfiniteQuery<PaginatedResponse<Course>>({
        queryKey: ['courses'],
        queryFn: ({pageParam}) => courseService.getCourses(pageParam as string | undefined),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.meta.next_cursor ?? undefined,
        staleTime: 5 * 60 * 1000,
    });

    const courses = query.data?.pages.flatMap(page => page.data) ?? [];

    return {...query, courses};
}

export function useUserCourses() {
    const query = useInfiniteQuery<PaginatedResponse<Course>>({
        queryKey: ['courses', 'user'],
        queryFn: ({pageParam}) => courseService.getUserCourses(pageParam as string | undefined),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.meta.next_cursor ?? undefined,
        staleTime: 5 * 60 * 1000,
    });

    const courses = query.data?.pages.flatMap(page => page.data) ?? [];

    return {...query, courses};
}

export function useCourse(courseId: number) {
    return useQuery<Course>({
        queryKey: ['courses', 'show', courseId],
        queryFn: () => courseService.getCourseById(courseId),
        enabled: !!courseId,
        staleTime: 10 * 60 * 1000,
    });
}

export function useCreateCourse() {
    const navigate = useNavigate();
    const {addToast, updateToast} = useToast();
    const {invalidateQueries} = useOptimisticUpdate();

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
        onSettled: () => {
            invalidateQueries(['courses']);
        },
    });
}

export function useUpdateCourse(courseId: number) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {addToast, updateToast} = useToast();
    const {optimisticUpdate, rollback, invalidateQueries} = useOptimisticUpdate();
    const queryKey = ['courses'];

    return useMutation<
        Course,
        AxiosError<{ errors?: Record<string, string[]> }>,
        CourseData,
        { toastId: string, previousCourses: PaginatedResponse<Course> | undefined }
    >({
        mutationKey: ['courses', 'update', courseId],
        mutationFn: (data) => courseService.updateCourse(courseId, data),
        onMutate: async (updatedCourseData) => {
            const toastId = addToast('Обновляем курс...', 'loading');

            const previousCourses = await optimisticUpdate<PaginatedResponse<Course>>(
                queryKey,
                (old) => {
                    if (!old) return old;

                    return {
                        ...old,
                        data: old.data.map(
                            c => c.id === courseId ? {...c, ...updatedCourseData} : c
                        ),
                    };
                }
            );

            return {toastId, previousCourses};
        },
        onSuccess: (updatedCourse, _, context) => {
            queryClient.setQueryData<Course>(['courses', 'show', courseId], updatedCourse);

            updateToast(context.toastId, {
                message: 'Курс успешно обновлен!',
                type: 'success',
            });

            navigate('/courses');
        },
        onError: (_, __, context) => {
            rollback(queryKey, context?.previousCourses);

            if (context?.toastId) {
                updateToast(context.toastId, {
                    message: 'Произошла ошибка при обновлении курса. Попробуйте позже',
                    type: 'danger',
                });
            }
        },
        onSettled: () => {
            invalidateQueries(['courses']);
        },
    });
}

export function useDeleteCourse(courseId: number) {
    const queryClient = useQueryClient();
    const {addToast, updateToast} = useToast();
    const {optimisticUpdate, rollback, invalidateQueries} = useOptimisticUpdate();
    const queryKey = ['courses'];

    return useMutation<
        void,
        AxiosError<{ errors?: Record<string, string[]> }>,
        void,
        { toastId: string, previousCourses: PaginatedResponse<Course> | undefined }
    >({
        mutationKey: ['courses', 'delete', courseId],
        mutationFn: () => courseService.deleteCourse(courseId),
        onMutate: async () => {
            const toastId = addToast('Удаляем курс...', 'loading');

            const previousCourses = await optimisticUpdate<PaginatedResponse<Course>>(
                queryKey,
                (old) => {
                    if (!old) return old;

                    return {
                        ...old,
                        data: old.data.map(
                            c => c.id === courseId ? {...c, isDeleting: true} : c
                        ),
                    };
                }
            );

            return {toastId, previousCourses};
        },
        onSuccess: (_, __, context) => {
            queryClient.removeQueries({queryKey: ['courses', 'show', courseId]});

            updateToast(context.toastId, {
                message: 'Курс успешно удален!',
                type: 'success',
            });
        },
        onError: (_, __, context) => {
            rollback(queryKey, context?.previousCourses);

            if (context?.toastId) {
                updateToast(context.toastId, {
                    message: 'Произошла ошибка при удалении. Попробуйте позже',
                    type: 'danger',
                });
            }
        },
        onSettled: () => {
            invalidateQueries(['courses']);
        },
    });
}

export function useJoinCourse(courseId: number) {
    const navigate = useNavigate();
    const {addToast, updateToast} = useToast();
    const {optimisticUpdate, rollback, invalidateQueries} = useOptimisticUpdate();
    const queryKey = ['courses'];

    return useMutation<
        Course,
        AxiosError<{ errors?: Record<string, string[]> }>,
        void,
        { toastId: string, previousCourses: PaginatedResponse<Course> | undefined }
    >({
        mutationKey: ['courses', 'join', courseId],
        mutationFn: () => courseService.joinCourse(courseId),
        onMutate: async () => {
            const toastId = addToast('Присоединяемся к курсу...', 'loading');

            const previousCourses = await optimisticUpdate<PaginatedResponse<Course>>(
                queryKey,
                (old) => {
                    if (!old) return old;

                    return {
                        ...old,
                        data: old.data.map(
                            c => c.id === courseId ? {...c, has_course: true} : c
                        ),
                    };
                }
            );

            return {toastId, previousCourses};
        },
        onSuccess: (_, __, context) => {
            updateToast(context.toastId, {
                message: 'Вы присоединились к курсу!',
                type: 'success',
            });

            navigate('/courses');
        },
        onError: (_, __, context) => {
            rollback(queryKey, context?.previousCourses);

            if (context?.toastId) {
                updateToast(context.toastId, {
                    message: 'Произошла ошибка при присоединении к курсу. Попробуйте позже',
                    type: 'danger',
                });
            }
        },
        onSettled: () => {
            invalidateQueries(['courses']);
        },
    });
}

export function useLeaveCourse(courseId: number) {
    const {addToast, updateToast} = useToast();
    const {optimisticUpdate, rollback, invalidateQueries} = useOptimisticUpdate();
    const queryKey = ['courses', 'user'];

    return useMutation<
        void,
        AxiosError<{ errors?: Record<string, string[]> }>,
        void,
        { toastId: string, previousUserCourses: PaginatedResponse<Course> | undefined }
    >({
        mutationKey: ['courses', 'leave', courseId],
        mutationFn: () => courseService.leaveCourse(courseId),
        onMutate: async () => {
            const toastId = addToast('Выходим из курса...', 'loading');

            const previousUserCourses = await optimisticUpdate<PaginatedResponse<Course>>(
                queryKey,
                (old) => {
                    if (!old) return old;

                    return {
                        ...old,
                        data: old.data.map(
                            c => c.id === courseId ? {...c, isDeleting: true} : c
                        ),
                    };
                }
            );

            return {toastId, previousUserCourses};
        },
        onSuccess: (_, __, context) => {
            updateToast(context.toastId, {
                message: 'Вы вышли из курса!',
                type: 'success',
            });
        },
        onError: (_, __, context) => {
            rollback(queryKey, context?.previousUserCourses);

            if (context?.toastId) {
                updateToast(context.toastId, {
                    message: 'Произошла ошибка при выходе из курса. Попробуйте позже',
                    type: 'danger',
                });
            }
        },
        onSettled: () => {
            invalidateQueries(['courses']);
        },
    });
}

export function useTaskCompletion(
    courseId: number,
    action: 'complete' | 'uncomplete'
) {
    const {addToast} = useToast();
    const {optimisticUpdate, rollback, invalidateQueries} = useOptimisticUpdate();
    const queryKey = ['courses', 'user'];

    return useMutation<
        Course,
        AxiosError<{ errors?: Record<string, string[]> }>,
        void,
        { previousUserCourses: PaginatedResponse<Course> | undefined }
    >({
        mutationKey: ['courses', action, courseId],
        mutationFn: () =>
            action === 'complete'
                ? courseService.completeTask(courseId)
                : courseService.uncompleteTask(courseId),
        onMutate: async () => {
            const delta = action === 'complete' ? 1 : -1;

            const previousUserCourses = await optimisticUpdate<PaginatedResponse<Course>>(
                queryKey,
                (old) => {
                    if (!old) return old;

                    return {
                        ...old,
                        data: old.data.map(
                            c => c.id === courseId ? {...c, completed_tasks: c.completed_tasks + delta} : c
                        ),
                    };
                }
            );

            return {previousUserCourses};
        },
        onError: (_, __, context) => {
            rollback(queryKey, context?.previousUserCourses);
            addToast('Произошла ошибка. Попробуйте позже', 'danger');
        },
        onSettled: () => {
            invalidateQueries(['courses', 'user']);
        },
    });
}

export function useAddCompletedTask(courseId: number) {
    return useTaskCompletion(courseId, 'complete');
}

export function useRemoveCompletedTask(courseId: number) {
    return useTaskCompletion(courseId, 'uncomplete');
}
