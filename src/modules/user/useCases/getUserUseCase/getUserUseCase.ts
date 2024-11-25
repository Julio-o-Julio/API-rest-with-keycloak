import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../repositories/UserRepository';

interface GetUserRequest {
  email: string;
}

@Injectable()
export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email }: GetUserRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new NotFoundException();

    return user;
  }
}
