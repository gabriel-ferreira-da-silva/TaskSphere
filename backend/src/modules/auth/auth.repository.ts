import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

    async createUser(email: string, name: string, password: string) {
    return this.prisma.user.create({
        data: {
        email,
        name,
        password,
        }
    });
    }



  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
