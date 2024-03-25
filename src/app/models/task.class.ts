import { Subtask } from "./subtask.calss";

export class Task {
    title: string;
    description: string;
    due_date: string;
    prio: string;
    status: string;
    category: number;
    assigned_to: number[] | [];
    subtasks: Subtask[];
    readonly id: number;
    readonly author: string;
    readonly created_at: string;
    
    constructor(obj: any) {
        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.due_date = obj ? obj.due_date : '';
        this.prio = obj ? obj.prio : 'L';
        this.status = obj ? obj.status : 'TODO';
        this.category = obj ? obj.category : null;
        this.assigned_to = obj ? obj.assigned_to : [];
        this.id = obj ? obj.id : null;
        this.author = obj ? obj.author : '';
        this.created_at = obj ? obj.created_at : '';
        this.subtasks = obj ? obj.subtasks : [];
    }

    public toJSON() {
        return {
            title: this.title,
            description: this.description,
            due_date: this.due_date,
            prio: this.prio,
            status: this.status,
            category: this.category,
            assigned_to: this.assigned_to,
        }
    }
}

