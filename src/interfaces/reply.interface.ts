import { User } from './user.interface';

export interface Reply {
  id: string;
  content: string;
  createdAt: Date;
  anonymous: boolean;
  _createdBy?: User['id'] | { _id: User['id']; username: string };
  _isMine?: boolean;
}