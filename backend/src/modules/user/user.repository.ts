import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class UserRepository {
  private prisma = new PrismaClient();

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async create(data: { name: string; email: string; password: string }) {
    return this.prisma.user.create({ data });
  }

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
