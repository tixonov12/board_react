import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {courseService} from "../services/courseService.ts";
import type {Course, CourseData} from "../types/course.ts";
import {useNavigate} from "react-router";
import type {AxiosError} from "axios";

export function useCourses() {
    return useQuery({
        queryKey: ['courses'],
        queryFn: () => courseService.getUserCourses(),
    });
}

export function useCourse(courseId: number) {
    return useQuery({
        queryKey: ['course', courseId],
        queryFn: () => courseService.getCourseById(courseId),
    });
}

export function useUpdateCourse(courseId: number) {
    const navigate = useNavigate();

    return useMutation<
        Course,
        AxiosError<{ errors?: Record<string, string[]> }>,
        CourseData
    >({
        mutationFn: (data: CourseData) => courseService.updateCourse(courseId, data),
        onSuccess: () => {
            navigate('/');
        },
    });
}

export function useAddCompletedTask(courseId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => courseService.addCompletedTask(courseId),
        onMutate: () => {
            queryClient.setQueryData(['courses'], (old: Course[]) =>
                old.map(course =>
                    course.id === courseId
                        ? {...course, completed_tasks: course.completed_tasks + 1}
                        : course
                )
            );
        },
    });
}

export function useRemoveCompletedTask(courseId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => courseService.removeCompletedTask(courseId),
        onMutate: () => {
            queryClient.setQueryData(['courses'], (old: Course[]) =>
                old.map(course =>
                    course.id === courseId
                        ? {...course, completed_tasks: course.completed_tasks - 1}
                        : course
                )
            );
        },
    });
}
