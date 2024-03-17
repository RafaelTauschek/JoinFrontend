export class User { 
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    username: string;


    constructor(obj: any) {
        this.email = obj ? obj.email : '';
        this.first_name = obj ? obj.first_name : '';
        this.id = obj ? obj.id : null;
        this.last_name = obj ? obj.last_name : '';
        this.username = obj ? obj.username : '';
    }



    public toJSON() {
        return {
            email: this.email,
            first_name: this.first_name,
            id: this.id,
            last_name: this.last_name,
            username: this.username,
        }
    }
}