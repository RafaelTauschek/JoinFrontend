export class Category {
    name: string;
    color: string;

    constructor(obj: any) {
        this.name = obj ? obj.name : '';
        this.color = obj ? obj.color : '';
    }

    public toJSON() {
        return {
            name: this.name,
            color: this.color
        }
    }
}