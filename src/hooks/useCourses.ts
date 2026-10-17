import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {courseService} from "../services/courseService.ts";
import type {Course, CourseData} from "../types/course.ts";
import {useNavigate} from "react-router";
import type {AxiosError} from "axios";

export function useCourses() {
    return useQuery({
        queryKey: ['courses'],
        queryFn: () => courseService.getCourses(),
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
    });
}

export function useUpdateCourse(courseId: number) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

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
    });
}

export function useDeleteCourse(courseId: number) {
    const queryClient = useQueryClient();

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
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['courses']});
            queryClient.invalidateQueries({queryKey: ['courses', 'user']});
        },
    });
}

export function useUserCourses() {
    return useQuery({
        queryKey: ['courses', 'user'],
        queryFn: () => courseService.getUserCourses(),
    });
}

export function useJoinCourse(courseId: number) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

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
        },
    });
}

export function useLeaveCourse(courseId: number) {
    const queryClient = useQueryClient();

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
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['courses']});
            queryClient.invalidateQueries({queryKey: ['courses', 'user']});
        },
    });
}

export function useAddCompletedTask(courseId: number) {
    const queryClient = useQueryClient();

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
        },
    });
}

export function useRemoveCompletedTask(courseId: number) {
    const queryClient = useQueryClient();

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
        },
    });
}
