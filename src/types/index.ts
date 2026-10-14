/** Общие доменные типы Kosta Method. */

export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';

export type Goal = 'weight_loss' | 'tone' | 'endurance' | 'habit';

export interface UserProfile {
  id: string;
  name: string;
  goal: Goal;
  level: FitnessLevel;
  weightKg: number;
  heightCm: number;
  streakDays: number;
  trialDaysLeft: number;
  startDate: string; // ISO date
}

export interface Exercise {
  id: string;
  name: string;
  /** Длительность в секундах (для таймерных) или null, если считаются повторы */
  durationSec: number | null;
  reps: number | null;
  sets: number;
  restSec: number;
  /** Подсказка Кости на время выполнения */
  coachTip: string;
  targetZone: BodyZone;
}

export type BodyZone =
  | 'arms'
  | 'shoulders'
  | 'chest'
  | 'abs'
  | 'back'
  | 'glutes'
  | 'legs'
  | 'full_body';

export interface Workout {
  id: string;
  day: number;
  title: string;
  focus: BodyZone;
  durationMin: number;
  intensity: 1 | 2 | 3;
  exercises: Exercise[];
  kcalEstimate: number;
}

export interface DayPlan {
  day: number;
  date: string; // ISO date
  workout: Workout | null; // null = день отдыха
  isCompleted: boolean;
  isRestDay: boolean;
}

export interface ZoneProgress {
  zone: BodyZone;
  /** 0..1 — визуальное заполнение «карты тела» */
  tone: number;
  /** Изменение в см за всё время (отрицательное — уменьшение) */
  changeCm: number;
}

export interface WeightEntry {
  date: string;
  weightKg: number;
}

export interface CoachMessage {
  id: string;
  role: 'user' | 'kosta';
  text: string;
  createdAt: string;
}

export type SubscriptionPlan = 'free' | 'monthly' | 'yearly' | 'lifetime';

/** Программа тренировок — самостоятельный курс, который выбирает пользователь. */
export interface TrainingProgram {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  durationDays: number;
  level: FitnessLevel;
  focus: BodyZone[];
  coverEmoji: string;
  kcalRange: [number, number];
  workoutMinutes: number;
  templateIds: string[];
  workDaysPerCycle: number;
}
