import axios from 'axios';
import { User } from '../interfaces/user.interface';

export class RandomUserService {
  private API_URL: string;

  constructor() {
    this.API_URL = 'http://localhost:3000';
  }

  async getUsers(results = 5): Promise<User[]> {
    const res = await axios.get(`https://randomuser.me/api/?results=${results}`);
    
    const usersArray: User[] = res.data.results.map((user: any) => {
      const u: User = {
        email: user.email,
        name: user.login.username,
        password: user.login.password,
        id: '',
        projects: [],
        tasks: [],
        collaborations: [],
        createdAt: new Date
      };
      return u;
    });

    return usersArray;
  }
}
