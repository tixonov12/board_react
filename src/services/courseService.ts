import type {Course, CourseData} from "../types/course.ts";
import api from "../lib/axios.ts";
import type {PaginatedResponse} from "../types/pagination.ts";

export const courseService = {
    getCourses: async (cursor?: string) => {
        const res = await api.get<PaginatedResponse<Course>>('/courses', {
            params: cursor ? {cursor} : {},
        });
        return res.data;
    },
    getUserCourses: async (cursor?: string) => {
        const res = await api.get<PaginatedResponse<Course>>(`/my/courses`, {
            params: cursor ? {cursor} : {},
        });
        return res.data;
    },
    getCourseById: async (courseId: number) => {
        const res = await api.get<Course>(`/courses/${courseId}`);
        return res.data;
    },
    createCourse: async (data: CourseData) => {
        const res = await api.post<Course>('/courses', data);
        return res.data;
    },
    updateCourse: async (courseId: number, data: CourseData) => {
        const res = await api.patch<Course>(`/courses/${courseId}`, data);
        return res.data;
    },
    deleteCourse: async (courseId: number) => {
        await api.delete<void>(`/courses/${courseId}`);
    },
    joinCourse: async (courseId: number) => {
        const res = await api.post<Course>(`/my/courses/${courseId}/join`);
        return res.data;
    },
    leaveCourse: async (courseId: number) => {
        await api.delete<void>(`/my/courses/${courseId}/leave`);
    },
    completeTask: async (courseId: number) => {
        const res = await api.post<Course>(`/my/courses/${courseId}/complete`);
        return res.data;
    },
    uncompleteTask: async (courseId: number) => {
        const res = await api.delete<Course>(`/my/courses/${courseId}/complete`);
        return res.data;
    },
};
