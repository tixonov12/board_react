export interface Course {
    id: number;
    name: string;
    total_tasks: number;
    completed_tasks: number;
}

export type CourseData = {
    name: string;
    total_tasks: number;
}
