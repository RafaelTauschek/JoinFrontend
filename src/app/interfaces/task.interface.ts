import { Subtask } from "../models/subtask.calss";

export interface TaskInterface {
    author: string;
    title: string;
    description: string;
    created_at: string;
    due_date: string;
    assigned_to: number[] | [];
    prio: string;
    status: string;
    category: number;
    subtasks: Subtask[];
}
