import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PaymentsService } from './payments.service';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  @Post('webhooks/revenuecat')
  webhook(@Body() body: Record<string, unknown>) {
    return this.payments.handleRevenueCatWebhook(body);
  }

  @Get('entitlements')
  entitlements(@Query('plan') plan: 'monthly' | 'yearly' | 'lifetime' = 'monthly') {
    return this.payments.getEntitlements(plan);
  }
}
