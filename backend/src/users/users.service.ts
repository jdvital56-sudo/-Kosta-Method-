import { Injectable, NotFoundException } from '@nestjs/common';

export interface UserRecord {
  id: string;
  email: string;
  password: string;
  name: string;
  goal: 'weight_loss' | 'tone' | 'endurance' | 'habit';
  level: 'beginner' | 'intermediate' | 'advanced';
  weightKg: number;
  heightCm: number;
  streakDays: number;
  trialDaysLeft: number;
  startDate: string;
}

/** In-memory хранилище — заменяется на PostgreSQL на этапе интеграции БД. */
@Injectable()
export class UsersService {
  private readonly users = new Map<string, UserRecord>();

  async create(data: { email: string; password: string; name: string }): Promise<UserRecord> {
    const id = `u-${this.users.size + 1}`;
    const record: UserRecord = {
      id,
      email: data.email,
      password: data.password, // TODO: argon2-hash при подключении БД
      name: data.name,
      goal: 'weight_loss',
      level: 'beginner',
      weightKg: 68,
      heightCm: 166,
      streakDays: 0,
      trialDaysLeft: 7,
      startDate: new Date().toISOString().slice(0, 10),
    };
    this.users.set(id, record);
    return record;
  }

  async findById(id: string): Promise<UserRecord> {
    const user = this.users.get(id);
    if (!user) throw new NotFoundException('Пользователь не найден');
    return user;
  }

  async validateCredentials(email: string, password: string): Promise<UserRecord | null> {
    for (const user of this.users.values()) {
      if (user.email === email && user.password === password) return user;
    }
    return null;
  }

  toPublicProfile(user: UserRecord) {
    const { password: _password, ...publicProfile } = user;
    return publicProfile;
  }
}
