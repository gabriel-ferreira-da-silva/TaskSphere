import { Injectable } from '@nestjs/common'
import { PrismaClient, Project } from '@prisma/client'
import { CreateProjectDto } from './dto/createProject.dto'

@Injectable()
export class ProjectRepository {
  private prisma = new PrismaClient()

  findAll(): Promise<Project[]> {
    return this.prisma.project.findMany()
  }

  findOne(id: string): Promise<Project | null> {
    return this.prisma.project.findUnique({ where: { id } })
  }

  create(data: CreateProjectDto): Promise<Project> {
    return this.prisma.project.create({ data })
  }

  update(
    id: string,
    data: Partial<CreateProjectDto>,
  ): Promise<Project> {
    return this.prisma.project.update({ where: { id }, data })
  }

  remove(id: string): Promise<Project> {
    return this.prisma.project.delete({ where: { id } })
  }
}
