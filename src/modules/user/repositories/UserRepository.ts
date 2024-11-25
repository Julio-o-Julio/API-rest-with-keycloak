import { User } from '../entities/User';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findMany(): Promise<User[]>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract update(currentEmail: string, user: User): Promise<void>;
  abstract delete(email: string): Promise<void>;
}
