import type {Course, CourseData} from "../types/course.ts";
import api from "../lib/axios.ts";

export const courseService = {
    updateCourse: async (courseId: number, data: CourseData) => {
        const res = await api.patch(`courses/${courseId}`, data);
        return res.data;
    },
    getUserCourses: async () => {
        const res = await api.get<Course[]>(`/my/courses`);
        return res.data;
    },
    addCompletedTask: async (courseId: number) => {
        const res = await api.post<Course>(`/my/courses/${courseId}/add`);
        return res.data;
    },
    removeCompletedTask: async (courseId: number) => {
        const res = await api.post<Course>(`/my/courses/${courseId}/remove`);
        return res.data;
    },
    getCourseById: async (courseId: number) => {
        const res = await api.get<Course>(`/courses/${courseId}`);
        return res.data;
    },
};
