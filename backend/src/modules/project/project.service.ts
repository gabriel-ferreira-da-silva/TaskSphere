import { Injectable, NotFoundException } from '@nestjs/common'
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
