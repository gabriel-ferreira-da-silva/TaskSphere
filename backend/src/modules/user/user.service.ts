import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { UserRepository } from './user.repository'
import { CreateUserDto } from './dto/createUser.dto'
import {User} from '@prisma/client'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll()
  }

  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne(id)
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
    return this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    })
  }

  async update(id: string, data: Partial<CreateUserDto>): Promise<User> {
    return this.userRepository.update(id, data)
  }

  async remove(id: string ): Promise<User> {
    return this.userRepository.remove(id)
  }
}
