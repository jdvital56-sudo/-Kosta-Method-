import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

export interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  /** MVP: email+password через users (хранилище подключится на этапе БД). */
  async signIn(email: string, password: string) {
    const user = await this.users.validateCredentials(email, password);
    if (!user) throw new UnauthorizedException('Неверный email или пароль');
    return this.issueToken(user.id, user.email);
  }

  async signUp(email: string, password: string, name: string) {
    const user = await this.users.create({ email, password, name });
    return this.issueToken(user.id, user.email);
  }

  private async issueToken(sub: string, email: string) {
    const accessToken = await this.jwt.signAsync({ sub, email } satisfies JwtPayload);
    const user = await this.users.findById(sub);
    return { accessToken, user };
  }
}
