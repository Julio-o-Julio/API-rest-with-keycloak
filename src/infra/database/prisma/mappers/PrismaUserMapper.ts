import { User } from '../../../../modules/user/entities/User';
import { User as UserRaw } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma({ id, email, name, password }: User): UserRaw {
    return {
      id,
      email,
      name,
      password,
    };
  }

  static toDomain({ id, email, name, password }: UserRaw): User {
    return new User(
      {
        email,
        name,
        password,
      },
      id,
    );
  }
}
