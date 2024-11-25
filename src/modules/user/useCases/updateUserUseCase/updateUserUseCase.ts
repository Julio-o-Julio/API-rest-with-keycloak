import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../repositories/UserRepository';
import { User } from '../../entities/User';
import { genSalt, hash } from 'bcrypt';

interface UpdateUserRequest {
  email?: string;
  name?: string;
  password?: string;
}

@Injectable()
export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(
    currentEmail: string,
    { email, name, password }: UpdateUserRequest,
  ) {
    const userRaw = await this.userRepository.findByEmail(currentEmail);

    if (!userRaw) {
      throw new NotFoundException();
    }

    let updatedPassword = userRaw.password;

    if (password) {
      const salt = await genSalt(10);
      updatedPassword = await hash(password, salt);
    }

    const user = new User({
      email: email || userRaw.email,
      name: name || userRaw.name,
      password: updatedPassword,
    });

    await this.userRepository.update(currentEmail, user);

    return user;
  }
}
