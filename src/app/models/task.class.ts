export class Task {
    title: string;
    description: string;
    due_date: Date | null;
    prio: string;
    status: string;
    category: number;
    assigned_to: number[] | [];
    id: number;
    
    constructor(obj: any) {
        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.due_date = obj ? obj.due_date : null;
        this.prio = obj ? obj.prio : 'L';
        this.status = obj ? obj.status : 'TODO';
        this.category = obj ? obj.category : null;
        this.assigned_to = obj ? obj.assigned_to : [];
        this.id = obj ? obj.id : null;
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
            id: this.id
        }
    }
}

