import { UserRepository } from '../../../../modules/user/repositories/UserRepository';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/PrismaUserMapper';
import { Injectable } from '@nestjs/common';
import { User } from '../../../../modules/user/entities/User';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const userRaw = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data: { ...userRaw, email: userRaw.email.toLowerCase() },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }

  async findMany(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => PrismaUserMapper.toDomain(user));
  }

  async update(currentEmail: string, user: User): Promise<void | null> {
    const currentUser = await this.prisma.user.findUnique({
      where: { email: currentEmail },
    });

    if (!currentUser) return null;

    const userRaw = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.update({
      where: { email: currentEmail },
      data: { ...userRaw },
    });
  }

  async delete(email: string): Promise<void | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) return null;

    await this.prisma.user.delete({ where: { email } });
  }
}
