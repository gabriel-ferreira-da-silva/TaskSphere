import axios from 'axios';

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
    this.API_URL = 'http://localhost:3000';
  }

  async getAll() {
    const res = await axios.get(`${this.API_URL}/projects`);
    return res.data;
  }

  async getOne(id: string) {
    const res = await axios.get(`${this.API_URL}/projects/${id}`);
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
