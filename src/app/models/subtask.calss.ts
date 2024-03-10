export class Subtask {
    task: number;
    title: string;
    description: string;
    status: string;

    constructor(obj: any) {
        this.task = obj ? obj.task : null;
        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.status = obj ? obj.status : '';
    }


    public toJSON() {
        return {
            task: this.task,
            title: this.title,
            description: this.description,
            status: this.status,
        }
    }
}