import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../../../modules/user/useCases/createUserUseCase/createUserUseCase';
import { CreateUserBody } from './dtos/CreateUserBody';
import { UserViewModel } from './viewModels/userViewModel';
import { GetUserUseCase } from 'src/modules/user/useCases/getUserUseCase/getUserUseCase';
import { GetManyUserUseCase } from 'src/modules/user/useCases/getManyUserUseCase/getManyUserUseCase';
import { UpdateUserBody } from './dtos/UpdateUserBody';
import { UpdateUserUseCase } from 'src/modules/user/useCases/updateUserUseCase/updateUserUseCase';
import { DeleteUserUseCase } from 'src/modules/user/useCases/deleteUserUseCase/deleteUserUseCase';
import { Unprotected } from 'nest-keycloak-connect';

@Controller('users')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
    private getManyUserUseCase: GetManyUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  @Unprotected()
  async createUser(@Body() body: CreateUserBody) {
    const { email, name, password } = body;

    const user = await this.createUserUseCase.execute({
      email,
      name,
      password,
    });

    return UserViewModel.toHttp(user);
  }

  @Get(':email')
  @Unprotected()
  async getUser(@Param('email') email: string) {
    const user = await this.getUserUseCase.execute({ email });

    return UserViewModel.toHttp(user);
  }

  @Get()
  @Unprotected()
  async getManyUser() {
    const users = await this.getManyUserUseCase.execute();

    return users.map((user) => UserViewModel.toHttp(user));
  }

  @Patch(':currentEmail')
  async updateUser(
    @Param('currentEmail') currentEmail: string,
    @Body() body: UpdateUserBody,
  ) {
    const { email, name, password } = body;

    const updatedUser = await this.updateUserUseCase.execute(currentEmail, {
      email,
      name,
      password,
    });

    return UserViewModel.toHttp(updatedUser);
  }

  @Delete(':email')
  async DeleteUserBody(@Param('email') email: string) {
    await this.deleteUserUseCase.execute({ email });
  }
}
