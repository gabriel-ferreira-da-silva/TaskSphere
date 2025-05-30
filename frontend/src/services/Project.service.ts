import axios from 'axios';
import { User } from '../interfaces/user.interface';

export interface CreateProjectDto {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  creatorId: string;
}

export class ProjectService {
  private API_URL: string;

  constructor() {
    this.API_URL = 'https://tasksphere-deploy.onrender.com';
  }

  async getAll() {
    const res = await axios.get(`${this.API_URL}/projects`);
    return res.data;
  }

  async getOne(id: string) {
    const res = await axios.get(`${this.API_URL}/projects/${id}`);
    return res.data;
  }

  async getCollaborators(projectId: string): Promise<User[]> {
    const res = await fetch(`${this.API_URL}/projects/${projectId}/collaborators`);
    if (!res.ok) throw new Error('Erro ao buscar colaboradores');
    return res.json();
  }

  async addCollaborator(projectId: string, data: { userId: string }) {
    const res = await axios.post(`${this.API_URL}/projects/${projectId}/collaborators`, data);
    return res.data;
  }

  async removeCollaborator(projectId: string, data: { userId: string }) {
    const res = await axios.delete(`${this.API_URL}/projects/${projectId}/collaborators`, {
      data: data, 
    });
    return res.data;
  }


  async getByUserId(id: string) {
    const res = await axios.get(`${this.API_URL}/projects/byUserId/${id}`);
    return res.data;
  }

  async create(project: CreateProjectDto) {
    const res = await axios.post(`${this.API_URL}/projects`, project);
    return res.data;
  }

  async update(id: string, project: Partial<CreateProjectDto>) {
    const res = await axios.patch(`${this.API_URL}/projects/${id}`, project);
    return res.data;
  }

  async remove(id: string) {
    const res = await axios.delete(`${this.API_URL}/projects/${id}`);
    return res.data;
  }
}
