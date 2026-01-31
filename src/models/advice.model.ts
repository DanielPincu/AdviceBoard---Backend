import { Schema, model } from 'mongoose';
import { Advice } from '../interfaces/advice.interface';


const adviceSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  anonymous: { type: Boolean, required: true },
  _createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});


export const AdviceModel = model<Advice>('Advice', adviceSchema);