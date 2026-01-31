export interface User extends Document {
    id: string;
    username: string;
    email: string;
    password: string;
    registrationDate: Date;
}