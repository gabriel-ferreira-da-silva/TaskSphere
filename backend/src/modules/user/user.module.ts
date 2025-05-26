import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserRepository } from './user.repository'

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService], // exporta se precisar usar em outros módulos
})
export class UserModule {}
