import { Schema, model } from 'mongoose';
import { User } from '../interfaces/user.interface';

const userSchema = new Schema<User>({
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        registrationDate: { type: Date, required: true, default: Date.now() }
    })

export const userModel = model<User>('User', userSchema);