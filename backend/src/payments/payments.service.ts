import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type Plan = 'monthly' | 'yearly' | 'lifetime';

const PLAN_ENTITLEMENTS: Record<Plan, string> = {
  monthly: 'premium_monthly',
  yearly: 'premium_yearly',
  lifetime: 'premium_lifetime',
};

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(private readonly config: ConfigService) {}

  /**
   * Обработка webhook от RevenueCat.
   * TODO(step-10): верификация подписи X-RevenueCat-Signature + запись в БД.
   */
  async handleRevenueCatWebhook(event: Record<string, unknown>) {
    const event_type = event.event_type as string | undefined;
    this.logger.log(`RevenueCat webhook: ${event_type ?? 'unknown'}`);
    return { received: true };
  }

  getEntitlements(plan: Plan) {
    return { entitlement: PLAN_ENTITLEMENTS[plan] };
  }

  isConfigured(): boolean {
    return Boolean(this.config.get('REVENUECAT_SECRET'));
  }
}
