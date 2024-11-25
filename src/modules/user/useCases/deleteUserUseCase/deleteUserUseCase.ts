import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../repositories/UserRepository';

interface DeleteUserRequest {
  email: string;
}

@Injectable()
export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email }: DeleteUserRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new NotFoundException();

    await this.userRepository.delete(email);

    return user;
  }
}
