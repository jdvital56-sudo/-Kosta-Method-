import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

import { AuthService } from './auth.service';

class CredentialsDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}

class SignUpDto extends CredentialsDto {
  @IsString()
  @MinLength(1)
  name!: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('sign-in')
  signIn(@Body() dto: CredentialsDto) {
    return this.auth.signIn(dto.email, dto.password);
  }

  @Post('sign-up')
  signUp(@Body() dto: SignUpDto) {
    return this.auth.signUp(dto.email, dto.password, dto.name);
  }
}
