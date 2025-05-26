import { Injectable } from '@nestjs/common'
import { TaskRepository } from './task.repository'
import { CreateTaskDto, UpdateTaskDto } from './dto/createTask.dto'

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  findAll() {
    return this.taskRepository.findAll()
  }

  findOne(id: string) {
    return this.taskRepository.findOne(id)
  }

  create(data: CreateTaskDto) {
    return this.taskRepository.create(data)
  }

  update(id: string, data: UpdateTaskDto) {
    return this.taskRepository.update(id, data)
  }

  remove(id: string) {
    return this.taskRepository.remove(id)
  }
}
