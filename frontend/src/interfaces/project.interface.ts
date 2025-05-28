import { User } from './user.interface';
import { Task } from './task.interface';

export interface Project {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  creator: User;
  collaborators: User[];
  tasks: Task[];
}
