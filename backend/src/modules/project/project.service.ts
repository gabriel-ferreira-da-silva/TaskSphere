import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { ProjectRepository } from './project.repository'
import { CreateProjectDto } from './dto/createProject.dto'

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async findAll() {
    return this.projectRepository.findAll()
  }

  async findOne(id: string) {
    const project = await this.projectRepository.findOne(id)
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`)
    }
    return project
  }

  async addCollaborator(projectId: string, id: string) {
    
    const alreadyAdded = await this.projectRepository.isUserCollaborator(projectId, id);
    
    if (alreadyAdded) {
      throw new ConflictException('Usuário já é colaborador');
    }

    return this.projectRepository.addCollaborator(projectId, id);
  }


  async removeCollaborator(projectId: string, id: string) {

    const alreadyAdded = await this.projectRepository.isUserCollaborator(projectId, id);
    console.log("tttttmeaaasadasfdasdfasd  ")
    /*
    if (!alreadyAdded) {
      throw new ConflictException('Usuário já é colaborador');
    }*/
    console.log("meaaasadasfdasdfasd  ")
    return this.projectRepository.removeCollaborator(projectId, id);
  }


  async getCollaborators(projectId: string) {
    return this.projectRepository.getCollaborators(projectId);
  }

  async findByUserId(id: string) {
    const project = await this.projectRepository.findByUserId(id)
    return project
  }

  async create(data: CreateProjectDto) {
    return this.projectRepository.create(data)
  }

  async update(id: string, data: Partial<CreateProjectDto>) {
    await this.findOne(id) 
    return this.projectRepository.update(id, data)
  }

  async remove(id: string) {
    await this.findOne(id) 
    return this.projectRepository.remove(id)
  }
}
