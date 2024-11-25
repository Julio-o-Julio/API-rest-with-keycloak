import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUseCase } from '../../../../modules/user/useCases/createUserUseCase/createUserUseCase';
import { DatabaseModule } from '../../../database/database.module';
import { GetUserUseCase } from 'src/modules/user/useCases/getUserUseCase/getUserUseCase';
import { GetManyUserUseCase } from 'src/modules/user/useCases/getManyUserUseCase/getManyUserUseCase';
import { UpdateUserUseCase } from 'src/modules/user/useCases/updateUserUseCase/updateUserUseCase';
import { DeleteUserUseCase } from 'src/modules/user/useCases/deleteUserUseCase/deleteUserUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    GetManyUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UserModule {}
