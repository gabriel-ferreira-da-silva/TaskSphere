import { Module } from '@nestjs/common'
import { UserModule } from './modules/user/user.module'
import { ProjectModule } from './modules/project/project.module'
import { TaskModule } from './modules/task/task.module'
import { AuthModule } from './modules/auth/auth.module'
@Module({
  imports: [UserModule,
    ProjectModule,
    TaskModule,
    AuthModule
  ],
})
export class AppModule {}
