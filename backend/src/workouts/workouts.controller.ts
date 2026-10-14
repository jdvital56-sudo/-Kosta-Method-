import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsISO8601, IsNumber, IsString, Min } from 'class-validator';
import { Request } from 'express';

import { WorkoutsService } from './workouts.service';

class CompleteWorkoutDto {
  @IsString()
  workoutId!: string;

  @IsNumber()
  @Min(0)
  durationMin!: number;

  @IsNumber()
  @Min(0)
  kcal!: number;

  @IsISO8601()
  completedAt!: string;
}

interface AuthenticatedRequest extends Request {
  user?: { sub: string; email: string };
}

@ApiTags('workouts')
@ApiBearerAuth()
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workouts: WorkoutsService) {}

  @Get('programs')
  getPrograms() {
    return this.workouts.getPrograms();
  }

  @Get('program')
  getProgram(@Query('programId') programId?: string) {
    return this.workouts.getProgram(programId);
  }

  @Get('completions')
  getCompletions(@Req() req: AuthenticatedRequest) {
    return this.workouts.listCompletions(req.user?.sub ?? 'u-1');
  }

  @Get(':id')
  getWorkout(@Param('id') id: string) {
    return this.workouts.getWorkout(id);
  }

  @Post('completions')
  complete(@Req() req: AuthenticatedRequest, @Body() dto: CompleteWorkoutDto) {
    return this.workouts.complete(req.user?.sub ?? 'u-1', dto);
  }
}
