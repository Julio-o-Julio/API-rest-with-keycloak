import { v7 as uuidv7 } from 'uuid';

interface UserSchema {
  name: string;
  email: string;
  password: string;
}

export class User {
  private props: UserSchema;
  private readonly _id: string;

  constructor(props: UserSchema, id?: string | null) {
    this.props = {
      ...props,
    };
    this._id = id || uuidv7();
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this.props.email;
  }
  set email(email: string) {
    this.props.email = email;
  }

  get name(): string {
    return this.props.name;
  }
  set name(name: string) {
    this.props.name = name;
  }

  get password(): string {
    return this.props.password;
  }
  set password(password: string) {
    this.props.password = password;
  }
}
