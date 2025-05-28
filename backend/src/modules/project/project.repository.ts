import { Injectable } from '@nestjs/common'
import { PrismaClient, Project } from '@prisma/client'
import { CreateProjectDto } from './dto/createProject.dto'

@Injectable()
export class ProjectRepository {
  private prisma = new PrismaClient()
  
  findAll(): Promise<Project[]> {
    return this.prisma.project.findMany({
      include: {
        collaborators: true,
      },
    });
  }

  findOne(id: string): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: { id },
      include: {
        collaborators: true,
      },
    });
  }


  findByUserId(id: string): Promise<Project[] | null> {
    return this.prisma.project.findMany({ where: { creatorId: id } })
  }

  async getCollaborators(projectId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: {
        collaborators: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!project) {
      throw new Error('Projeto não encontrado');
    }

    return project.collaborators;
  }

  create(data: CreateProjectDto): Promise<Project> {
    return this.prisma.project.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      }
    });
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
