import { Module } from '@nestjs/common'
import { UserModule } from './modules/user/user.module'
import { ProjectModule } from './modules/project/project.module'
@Module({
  imports: [UserModule,
    ProjectModule
  ],
})
export class AppModule {}
