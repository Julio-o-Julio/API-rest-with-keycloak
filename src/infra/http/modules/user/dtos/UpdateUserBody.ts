import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserBody {
  @IsEmail()
  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  password: string;
}
