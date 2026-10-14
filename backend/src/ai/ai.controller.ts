import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { AiService } from './ai.service';

class CoachTurnDto {
  @IsString()
  role!: 'user' | 'kosta';

  @IsString()
  text!: string;
}

class CoachRequestDto {
  @IsString()
  @MinLength(1)
  message!: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CoachTurnDto)
  history?: CoachTurnDto[];
}

@ApiTags('ai')
@ApiBearerAuth()
@Controller('ai')
export class AiController {
  constructor(private readonly ai: AiService) {}

  @Post('coach')
  coach(@Body() dto: CoachRequestDto) {
    return this.ai.coach(dto.message, dto.history ?? []);
  }
}
