import { Project } from "./project.interface";
import { Task } from "./task.interface";

export enum Status {
  todo = 'todo',
  in_progress = 'in_progress',
  done = 'done',
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  projects: Project[];
  tasks: Task[];
  collaborations: Project[];
}
