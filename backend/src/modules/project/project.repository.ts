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

  async isUserCollaborator(projectId: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: { collaborators: true },
    });

    return project?.collaborators.some(user => user.id === userId);
  }

  async addCollaborator(projectId: string, userId: string) {
  return this.prisma.project.update({
    where: { id: projectId },
    data: {
      collaborators: {
        connect: {
          id: userId,
        },
      },
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

  async update(id: string, data: Partial<CreateProjectDto>): Promise<Project> {
    return this.prisma.project.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        updatedAt: new Date(),
        ...(data.collaborators ? {
          collaborators: {
            set: data.collaborators, 
          }
        } : {})
      }
    });
  }

  remove(id: string): Promise<Project> {
    return this.prisma.project.delete({ where: { id } })
  }
}
