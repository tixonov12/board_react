import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {courseService} from "../services/courseService.ts";
import type {Course, CourseData} from "../types/course.ts";
import {useNavigate} from "react-router";
import type {AxiosError} from "axios";
import {useToastContext} from "./useToast.ts";

export function useCourses(page: number) {
    return useQuery({
        queryKey: ['courses', page],
        queryFn: () => courseService.getCourses(page),
    });
}

export function useCourse(courseId: number) {
    return useQuery({
        queryKey: ['courses', 'show', courseId],
        queryFn: () => courseService.getCourseById(courseId),
        enabled: !!courseId,
    });
}

export function useCreateCourse() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {addToast} = useToastContext();

    return useMutation<
        Course,
        AxiosError<{ errors?: Record<string, string[]> }>,
        CourseData
    >({
        mutationKey: ['courses', 'create'],
        mutationFn: (data) => courseService.createCourse(data),
        onSuccess: (newCourse) => {
            queryClient.setQueryData(['courses'], (old: Course[] | undefined) => {
                if (!old) return;
                return [newCourse, ...old];
            });

            navigate('/courses');
        },
        onError: () => {
            addToast('Произошла ошибка при создании курса. Попробуйте позже', 'danger');
        },
    });
}

export function useUpdateCourse(courseId: number) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {addToast} = useToastContext();

    return useMutation<
        Course,
        AxiosError<{ errors?: Record<string, string[]> }>,
        CourseData
    >({
        mutationKey: ['courses', 'update', courseId],
        mutationFn: (data) => courseService.updateCourse(courseId, data),
        onSuccess: (updatedCourse) => {
            queryClient.setQueryData(['courses', 'show', courseId], updatedCourse);

            queryClient.setQueryData(['courses'], (old: Course[] | undefined) =>
                old?.map(course => course.id === courseId ? updatedCourse : course)
            );

            queryClient.setQueryData(['courses', 'user'], (old: Course[] | undefined) =>
                old?.map(course => course.id === courseId ? updatedCourse : course)
            );

            navigate('/courses');
        },
        onError: () => {
            addToast('Произошла ошибка при обновлении курса. Попробуйте позже', 'danger');
        },
    });
}

export function useDeleteCourse(courseId: number) {
    const queryClient = useQueryClient();
    const {addToast} = useToastContext();

    return useMutation({
        mutationKey: ['courses', 'delete', courseId],
        mutationFn: () => courseService.deleteCourse(courseId),
        onMutate: () => {
            const previousCourses = queryClient.getQueryData<Course[]>(['courses']);
            const previousUserCourses = queryClient.getQueryData<Course[]>(['courses', 'user']);

            queryClient.setQueryData(['courses'], (old: Course[] | undefined) =>
                old?.filter(course => course.id !== courseId)
            );

            queryClient.setQueryData(['courses', 'user'], (old: Course[] | undefined) =>
                old?.filter(course => course.id !== courseId)
            );

            return {previousCourses, previousUserCourses};
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(['courses'], context?.previousCourses);
            queryClient.setQueryData(['courses', 'user'], context?.previousUserCourses);

            addToast('Произошла ошибка при удалении. Попробуйте позже', 'danger');
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['courses']});
            queryClient.invalidateQueries({queryKey: ['courses', 'user']});
        },
    });
}

export function useUserCourses(page: number) {
    return useQuery({
        queryKey: ['courses', 'user', page],
        queryFn: () => courseService.getUserCourses(page),
    });
}

export function useJoinCourse(courseId: number) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {addToast} = useToastContext();

    return useMutation<
        Course,
        AxiosError<{ errors?: Record<string, string[]> }>,
        void,
        { previousCourses: Course[] | undefined }
    >({
        mutationKey: ['courses', 'join', courseId],
        mutationFn: () => courseService.joinCourse(courseId),
        onMutate: () => {
            const previousCourses = queryClient.getQueryData<Course[]>(['courses']);

            queryClient.setQueryData(['courses'], (old: Course[] | undefined) =>
                old?.map(course =>
                    course.id === courseId
                        ? {...course, has_course: true}
                        : course
                )
            );

            return {previousCourses};
        },
        onSuccess: (newCourse) => {
            queryClient.setQueryData(['courses', 'user'], (old: Course[] | undefined) => {
                if (!old) return;
                return [newCourse, ...old];
            });

            navigate('/courses');
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(['courses'], context?.previousCourses);

            addToast('Произошла ошибка при присоединении к курсу. Попробуйте позже', 'danger');
        },
    });
}

export function useLeaveCourse(courseId: number) {
    const queryClient = useQueryClient();
    const {addToast} = useToastContext();

    return useMutation({
        mutationKey: ['courses', 'leave', courseId],
        mutationFn: () => courseService.leaveCourse(courseId),
        onMutate: () => {
            const previousUserCourses = queryClient.getQueryData<Course[]>(['courses', 'user']);

            queryClient.setQueryData(['courses', 'user'], (old: Course[] | undefined) =>
                old?.filter(course => course.id !== courseId)
            );

            return {previousUserCourses};
        },
        onSuccess: () => {
            queryClient.setQueryData(['courses'], (old: Course[] | undefined) =>
                old?.map(course =>
                    course.id === courseId
                        ? {...course, has_course: false}
                        : course
                )
            );
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(['courses', 'user'], context?.previousUserCourses);

            addToast('Произошла ошибка при выходе из курса. Попробуйте позже', 'danger');
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['courses']});
            queryClient.invalidateQueries({queryKey: ['courses', 'user']});
        },
    });
}

export function useAddCompletedTask(courseId: number) {
    const queryClient = useQueryClient();
    const {addToast} = useToastContext();

    return useMutation({
        mutationKey: ['courses', 'add', courseId],
        mutationFn: () => courseService.addCompletedTask(courseId),
        onMutate: () => {
            const previousUserCourses = queryClient.getQueryData<Course[]>(['courses', 'user']);

            queryClient.setQueryData(['courses', 'user'], (old: Course[] | undefined) =>
                old?.map(course =>
                    course.id === courseId
                        ? {...course, completed_tasks: (course.completed_tasks ?? 0) + 1}
                        : course
                )
            );

            return {previousUserCourses};
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(['courses', 'user'], context?.previousUserCourses);

            addToast('Произошла ошибка. Попробуйте позже', 'danger');
        },
    });
}

export function useRemoveCompletedTask(courseId: number) {
    const queryClient = useQueryClient();
    const {addToast} = useToastContext();

    return useMutation({
        mutationKey: ['courses', 'remove', courseId],
        mutationFn: () => courseService.removeCompletedTask(courseId),
        onMutate: () => {
            const previousUserCourses = queryClient.getQueryData<Course[]>(['courses', 'user']);

            queryClient.setQueryData(['courses', 'user'], (old: Course[] | undefined) =>
                old?.map(course =>
                    course.id === courseId
                        ? {...course, completed_tasks: (course.completed_tasks ?? 0) - 1}
                        : course
                )
            );

            return {previousUserCourses};
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(['courses', 'user'], context?.previousUserCourses);

            addToast('Произошла ошибка. Попробуйте позже', 'danger');
        },
    });
}
