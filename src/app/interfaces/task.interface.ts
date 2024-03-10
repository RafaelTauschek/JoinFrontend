export interface TaskInterface {
    author: number;
    title: string;
    description: string;
    created_at: string;
    due_date: string;
    assigned_to: number[] | [];
    prio: string;
    status: string;
    category: number;
}
