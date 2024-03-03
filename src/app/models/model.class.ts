export class Contact {
    username: string;
    first_name: string;
    last_name: string;
    short_name: string;
    email: string;
    phone_number: number;
    color: string;


    constructor(obj: any) {
        this.username = obj ? obj.username : '';
        this.first_name = obj ? obj.first_name : '';
        this.last_name = obj ? obj.last_name : '';
        this.short_name = obj ? obj.short_name : '';
        this.email = obj ? obj.email : '';
        this.phone_number = obj ? obj.phone_number : '';
        this.color = obj ? obj.color : '';
    }
}