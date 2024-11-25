import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/UserRepository';
import { User } from '../../entities/User';
import { genSalt, hash } from 'bcrypt';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, name, password }: CreateUserRequest) {
    const userAlreadyExist = await this.userRepository.findByEmail(email);

    if (userAlreadyExist) throw new ConflictException();

    const salt = await genSalt(10);

    const user = new User({
      email,
      name,
      password: await hash(password, salt),
    });

    await this.userRepository.create(user);

    return user;
  }
}
