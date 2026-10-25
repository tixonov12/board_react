export interface Course {
    id: number;
    name: string;
    total_tasks: number;
    completed_tasks: number;
    has_course: boolean;
    created_at: string;
    isDeleting?: boolean;
}

export type CourseData = {
    name: string;
    total_tasks: number;
}
