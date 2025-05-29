import { Project } from './project.interface';
import { User } from './user.interface';
import { Status } from './status.enum';

export interface Task {
  id: string;
  title: string;
  status: Status;
  dueDate: Date;
  imageUrl: string;
  projectId: string;
  project: Project;
  creatorId: string;
  creator: User;
  createdAt: Date;
  updatedAt: Date;
}
