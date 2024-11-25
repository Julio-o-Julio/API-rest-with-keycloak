import { User } from '../../../../../modules/user/entities/User';

export class UserViewModel {
  static toHttp({ email, name }: User) {
    return {
      email,
      name,
    };
  }
}
