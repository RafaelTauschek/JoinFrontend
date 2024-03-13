export class Category {
    name: string;
    color: string;
    id: number;

    constructor(obj: any) {
        this.name = obj ? obj.name : '';
        this.color = obj ? obj.color : '';
        this.id = obj ? obj.id : null;
    }

    public toJSON() {
        return {
            name: this.name,
            color: this.color,
            id: this.id
        }
    }
}