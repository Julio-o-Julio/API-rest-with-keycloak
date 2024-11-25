import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/UserRepository';

@Injectable()
export class GetManyUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    const users = await this.userRepository.findMany();

    return users;
  }
}
