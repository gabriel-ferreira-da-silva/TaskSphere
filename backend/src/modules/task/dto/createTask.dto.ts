import { IsString, IsDate, IsEnum, IsOptional, IsUrl } from 'class-validator'
import { Type } from 'class-transformer'

export enum Status {
  todo = 'todo',
  in_progress = 'in_progress',
  done = 'done',
}

export class CreateTaskDto {
  @IsString()
  title: string

  @IsEnum(Status)
  status: Status

  @IsDate()
  @Type(() => Date)
  dueDate: Date
  
  @IsUrl()
  imageUrl: string

  @IsString()
  projectId: string

  @IsString()
  creatorId: string
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsEnum(Status)
  status?: Status

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dueDate?: Date

  @IsOptional()
  @IsUrl()
  imageUrl?: string
}
