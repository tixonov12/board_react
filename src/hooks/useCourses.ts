import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {courseService} from "../services/courseService.ts";
import type {AddCourseData, Course, CourseData} from "../types/course.ts";
import {useNavigate} from "react-router";
import type {AxiosError} from "axios";

export function useCourses() {
    return useQuery({
        queryKey: ['courses'],
        queryFn: () => courseService.getCourses(),
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
        mutationFn: (data) => courseService.createCourse(data),
        onSuccess: (newCourse) => {
            queryClient.setQueryData(['courses'], (old: Course[]) => [newCourse, ...old]);

            navigate('/courses');
        },
    });
}

export function useDeleteCourse(courseId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => courseService.deleteCourse(courseId),
        onMutate: () => {
            const previousCourses = queryClient.getQueryData(['courses']);

            queryClient.setQueryData(['courses'], (old: Course[]) =>
                old.filter(course => course.id !== courseId)
            );

            return {previousCourses};
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(['courses'], context?.previousCourses);
        },
    });
}

export function useDeleteUserCourse(courseId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => courseService.deleteUserCourse(courseId),
        onMutate: () => {
            const previousCourses = queryClient.getQueryData(['user_courses']);

            queryClient.setQueryData(['user_courses'], (old: Course[]) =>
                old.filter(course => course.id !== courseId)
            );

            return {previousCourses};
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(['user_courses'], context?.previousCourses);
        },
    });
}

export function useUserCourses() {
    return useQuery({
        queryKey: ['user_courses'],
        queryFn: () => courseService.getUserCourses(),
    });
}

export function useCourse(courseId: number) {
    return useQuery({
        queryKey: ['course', courseId],
        queryFn: () => courseService.getCourseById(courseId),
    });
}

export function useAddCourse() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation<
        Course,
        AxiosError<{ errors?: Record<string, string[]> }>,
        AddCourseData
    >({
        mutationFn: (data) => courseService.addCourse(data),
        onSuccess: (newCourse) => {
            queryClient.setQueryData(['user_courses'], (old: Course[]) => [newCourse, ...old]);

            navigate('/');
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
        mutationFn: (data) => courseService.updateCourse(courseId, data),
        onSuccess: (updatedCourse) => {
            queryClient.setQueryData(['course', courseId], updatedCourse);

            queryClient.setQueryData(['courses'], (old: Course[]) =>
                old.map(course => course.id === courseId ? updatedCourse : course)
            );

            navigate('/courses');
        },
    });
}

export function useAddCompletedTask(courseId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => courseService.addCompletedTask(courseId),
        onMutate: () => {
            const previousCourses = queryClient.getQueryData(['user_courses']);

            queryClient.setQueryData(['user_courses'], (old: Course[]) =>
                old.map(course =>
                    course.id === courseId
                        ? {...course, completed_tasks: course.completed_tasks + 1}
                        : course
                )
            );

            return {previousCourses};
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(['user_courses'], context?.previousCourses);
        },
    });
}

export function useRemoveCompletedTask(courseId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => courseService.removeCompletedTask(courseId),
        onMutate: () => {
            const previousCourses = queryClient.getQueryData(['user_courses']);

            queryClient.setQueryData(['user_courses'], (old: Course[]) =>
                old.map(course =>
                    course.id === courseId
                        ? {...course, completed_tasks: course.completed_tasks - 1}
                        : course
                )
            );

            return {previousCourses};
        },
        onError: (_, __, context) => {
            queryClient.setQueryData(['user_courses'], context?.previousCourses);
        },
    });
}
