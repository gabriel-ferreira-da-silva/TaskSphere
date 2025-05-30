import axios from 'axios';

export enum Status {
  todo = 'todo',
  in_progress = 'in_progress',
  done = 'done',
}

export interface CreateTaskDto {
  title: string;
  status: Status;
  dueDate: Date;
  imageUrl: string;
  projectId: string;
  creatorId: string;
}

export interface UpdateTaskDto {
  title?: string;
  status?: Status;
  dueDate?: Date;
  imageUrl?: string;
}

export class TaskService {
  private API_URL: string;

  constructor() {
    this.API_URL = 'https://tasksphere-deploy.onrender.com';
  }

  async getAll() {
    const res = await axios.get(`${this.API_URL}/tasks`);
    return res.data;
  }

  async getOne(id: string) {
    const res = await axios.get(`${this.API_URL}/tasks/${id}`);
    return res.data;
  }

  async getByProjectId(id: string) {
    const res = await axios.get(`${this.API_URL}/tasks/byProjectId/${id}`);
    return res.data;
  }


  async create(task: CreateTaskDto) {
    const res = await axios.post(`${this.API_URL}/tasks`, task);
    return res.data;
  }

  async update(id: string, task: UpdateTaskDto) {
    const res = await axios.put(`${this.API_URL}/tasks/${id}`, task);
    return res.data;
  }

  async remove(id: string) {
    const res = await axios.delete(`${this.API_URL}/tasks/${id}`);
    return res.data;
  }
}
