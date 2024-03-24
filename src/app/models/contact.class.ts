export class Contact {
    first_name: string;
    last_name: string;
    short_name: string;
    email: string;
    phone_number: number;
    color: string;
    readonly id: number;

    constructor(obj: any) {
        this.first_name = obj ? obj.first_name : '';
        this.last_name = obj ? obj.last_name : '';
        this.short_name = obj ? obj.short_name : '';
        this.email = obj ? obj.email : '';
        this.phone_number = obj ? obj.phone_number : '';
        this.color = obj ? obj.color : '';
        this.id = obj ? obj.id : undefined;
    }


    public toJSON() {
        return {
            first_name: this.first_name,
            last_name: this.last_name,
            short_name: this.short_name,
            email: this.email,
            phone_number: this.phone_number,
            color: this.color
        }
    }
}