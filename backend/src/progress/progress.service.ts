import { Injectable } from '@nestjs/common';

interface ZoneSnapshot {
  zone: string;
  tone: number;
  changeCm: number;
}

interface WeightEntry {
  userId: string;
  date: string;
  weightKg: number;
}

@Injectable()
export class ProgressService {
  private readonly weights: WeightEntry[] = [];
  private readonly zones = new Map<string, ZoneSnapshot[]>();

  addWeight(userId: string, date: string, weightKg: number) {
    this.weights.unshift({ userId, date, weightKg });
    return { ok: true };
  }

  getWeights(userId: string) {
    return this.weights.filter((w) => w.userId === userId).slice(0, 90);
  }

  getZones(userId: string): ZoneSnapshot[] {
    return (
      this.zones.get(userId) ?? [
        { zone: 'arms', tone: 0.25, changeCm: 0 },
        { zone: 'shoulders', tone: 0.2, changeCm: 0 },
        { zone: 'chest', tone: 0.3, changeCm: 0 },
        { zone: 'abs', tone: 0.15, changeCm: 0 },
        { zone: 'back', tone: 0.25, changeCm: 0 },
        { zone: 'glutes', tone: 0.2, changeCm: 0 },
        { zone: 'legs', tone: 0.35, changeCm: 0 },
      ]
    );
  }

  updateZone(userId: string, zone: string, tone: number) {
    const current = this.getZones(userId);
    this.zones.set(
      userId,
      current.map((z) => (z.zone === zone ? { ...z, tone: Math.min(1, Math.max(0, tone)) } : z)),
    );
    return { ok: true };
  }
}
