import { IsString, IsOptional, IsDateString, IsNotEmpty } from 'class-validator'

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description?: string

  @IsDateString()
  @IsNotEmpty()
  startDate: string

  @IsDateString()
  @IsNotEmpty()
  endDate: string

  @IsString()
  @IsNotEmpty()
  creatorId: string

  collaborators: any;
}
