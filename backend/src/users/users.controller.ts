import { Controller, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { UsersService } from './users.service';

interface AuthenticatedRequest extends Request {
  user?: { sub: string; email: string };
}

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get('me')
  async me(@Req() req: AuthenticatedRequest) {
    // TODO(step-09): JwtAuthGuard — достаёт payload из Authorization header
    const id = req.user?.sub ?? 'u-1';
    return this.users.toPublicProfile(await this.users.findById(id));
  }
}
