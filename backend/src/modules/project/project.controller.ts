import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common'
import { ProjectService } from './project.service'
import { CreateProjectDto } from './dto/createProject.dto'

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll() {
    return this.projectService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id)
  }

  @Get('/byUserId/:userId')
  findByUserId(@Param('userId') id: string) {
    return this.projectService.findByUserId(id)
  }

  @Get(':id/collaborators')
  async getCollaborators(@Param('id') projectId: string) {
    console.log("não fode")
    return this.projectService.getCollaborators(projectId);
  }


  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: Partial<CreateProjectDto>) {
    return this.projectService.update(id, updateProjectDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id)
  }
}
