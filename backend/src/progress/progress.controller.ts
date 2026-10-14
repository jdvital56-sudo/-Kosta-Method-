import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsISO8601, IsNumber, IsString, Max, Min } from 'class-validator';
import { Request } from 'express';

import { ProgressService } from './progress.service';

class AddWeightDto {
  @IsISO8601()
  date!: string;

  @IsNumber()
  @Min(20)
  @Max(400)
  weightKg!: number;
}

class UpdateZoneDto {
  @IsString()
  zone!: string;

  @IsNumber()
  @Min(0)
  @Max(1)
  tone!: number;
}

interface AuthenticatedRequest extends Request {
  user?: { sub: string; email: string };
}

@ApiTags('progress')
@ApiBearerAuth()
@Controller('progress')
export class ProgressController {
  constructor(private readonly progress: ProgressService) {}

  @Get('weights')
  getWeights(@Req() req: AuthenticatedRequest) {
    return this.progress.getWeights(req.user?.sub ?? 'u-1');
  }

  @Get('zones')
  getZones(@Req() req: AuthenticatedRequest, @Query('userId') userId?: string) {
    return this.progress.getZones(userId ?? req.user?.sub ?? 'u-1');
  }

  @Post('weights')
  addWeight(@Req() req: AuthenticatedRequest, @Body() dto: AddWeightDto) {
    return this.progress.addWeight(req.user?.sub ?? 'u-1', dto.date, dto.weightKg);
  }

  @Post('zones')
  updateZone(@Req() req: AuthenticatedRequest, @Body() dto: UpdateZoneDto) {
    return this.progress.updateZone(req.user?.sub ?? 'u-1', dto.zone, dto.tone);
  }
}
