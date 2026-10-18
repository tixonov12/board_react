import type {Course, CourseData} from "../types/course.ts";
import api from "../lib/axios.ts";
import type {PaginatedResponse} from "../types/pagination.ts";

export const courseService = {
    getCourses: async (page: number) => {
        const res = await api.get<PaginatedResponse<Course>>('/courses', {params: {page}});
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
        const res = await api.patch(`/courses/${courseId}`, data);
        return res.data;
    },
    deleteCourse: async (courseId: number) => {
        await api.delete<void>(`/courses/${courseId}`);
    },
    getUserCourses: async (page: number) => {
        const res = await api.get<PaginatedResponse<Course>>(`/my/courses`, {params: {page}});
        return res.data;
    },
    joinCourse: async (courseId: number) => {
        const res = await api.post<Course>(`/my/courses/${courseId}/join`);
        return res.data;
    },
    leaveCourse: async (courseId: number) => {
        await api.delete<void>(`/my/courses/${courseId}/leave`);
    },
    addCompletedTask: async (courseId: number) => {
        const res = await api.post<Course>(`/my/courses/${courseId}/add`);
        return res.data;
    },
    removeCompletedTask: async (courseId: number) => {
        const res = await api.post<Course>(`/my/courses/${courseId}/remove`);
        return res.data;
    },
};
