import axios from 'axios';
import { User } from '../interfaces/user.interface';


export class UserService {
  private API_URL: string;

  constructor() {
    this.API_URL = 'http://localhost:3000';
  }

  async getAll() {
    const res = await axios.get(`${this.API_URL}/users`);
    return res.data;
  }

  async getOne(id: string) {
    const res = await axios.get(`${this.API_URL}/users/${id}`);
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



  async create(user: User) {
    const res = await axios.post(`${this.API_URL}/users`, user);
    return res.data;
  }

  async update(id: string, project: Partial<User>) {
    const res = await axios.patch(`${this.API_URL}/users/${id}`, project);
    return res.data;
  }

  async remove(id: string) {
    const res = await axios.delete(`${this.API_URL}/users/${id}`);
    return res.data;
  }
}
