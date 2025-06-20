import axios from 'axios';

export class AuthService {

  API_URL: string;
  constructor() {
    this.API_URL = 'https://tasksphere-deploy.onrender.com';
  }

  async login(email, password) {
    const res = await axios.post(`${this.API_URL}/auth/login`, { email, password });
    return res.data;
  }

  async register(email,name, password) {
    const res = await axios.post(`${this.API_URL}/auth/register`, { email, name, password });
    return res.data;
  }
}
