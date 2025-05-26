import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'
import { TaskService } from './task.service'
import { CreateTaskDto, UpdateTaskDto } from './dto/createTask.dto'

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll() {
    return this.taskService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id)
  }

  @Post()
  create(@Body() data: CreateTaskDto) {
    return this.taskService.create(data)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateTaskDto) {
    return this.taskService.update(id, data)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id)
  }
}
