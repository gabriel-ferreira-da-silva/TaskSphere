import { Injectable } from '@nestjs/common'
import { PrismaClient, Task } from '@prisma/client'
import { CreateTaskDto, UpdateTaskDto } from './dto/createTask.dto'

@Injectable()
export class TaskRepository {
  private prisma = new PrismaClient()

  findAll(): Promise<Task[]> {
    return this.prisma.task.findMany()
  }

  findOne(id: string): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: { id } })
  }

  findByProjectId(id: string): Promise<Task[] | null> {
    return this.prisma.task.findMany({ where: { projectId: id } })
  }

  create(data: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({ data })
  }

  update(id: string, data: UpdateTaskDto): Promise<Task> {
    return this.prisma.task.update({ where: { id }, data })
  }

  remove(id: string): Promise<Task> {
    return this.prisma.task.delete({ where: { id } })
  }
}
