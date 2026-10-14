import { apiRequest } from '@/services/api';
import { CoachMessage } from '@/types';

interface CoachReply {
  text: string;
}

/** Локальные заготовки — работают без сети (офлайн-режим Кости). */
const OFFLINE_REPLIES = [
  'Отличный вопрос! Главное — регулярность. Даже 15 минут в день дают результат.',
  'Я рядом 💪 Если тяжело — сделай паузу 30 секунд и продолжай в своём темпе.',
  'Помни про воду: стакан за 20 минут до тренировки — и будет легче!',
  'Сегодня твой день «Пресс и талия». Начнём с разогрева?',
  'Маленький шаг каждый день > идеальный план раз в месяц. Ты справляешься!',
];

let counter = 0;

export async function askKosta(message: string, history: CoachMessage[] = []): Promise<string> {
  try {
    const res = await apiRequest<CoachReply>('/ai/coach', {
      method: 'POST',
      body: {
        message,
        history: history.slice(-10).map(({ role, text }) => ({ role, text })),
      },
    });
    return res.text;
  } catch {
    // Офлайн-фолбэк, чтобы Костя всегда «отвечал»
    counter += 1;
    return OFFLINE_REPLIES[counter % OFFLINE_REPLIES.length];
  }
}
