import { User } from './user.interface';

export interface Advice extends Document {
    title: string;
    content: string;
    createdAt: Date;
    anonymous: boolean;
    _createdBy: User['id'];
}