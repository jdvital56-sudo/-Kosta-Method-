import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface CoachTurn {
  role: 'user' | 'kosta';
  text: string;
}

const FALLBACK_REPLIES = [
  'Главное — регулярность. Даже 15 минут в день дают результат 💪',
  'Если тяжело — сделай паузу 30 секунд и продолжай в своём темпе.',
  'Стакан воды за 20 минут до тренировки — и будет легче!',
  'Маленький шаг каждый день важнее идеального плана раз в месяц.',
];

const KOCHA_SYSTEM_PROMPT =
  'Ты — Костя, виртуальный фитнес-тренер женского приложения Kosta Method. ' +
  'Отвечай коротко, тепло, на «ты», мотивируй. Не давай медицинских рекомендаций.';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private counter = 0;

  constructor(private readonly config: ConfigService) {}

  /**
   * Ответ тренера. Открытая версия — безопасный фолбэк-набор.
   * TODO(step-09): вызов OpenAI (gpt-4o-mini) с KOCHA_SYSTEM_PROMPT при наличии OPENAI_API_KEY.
   */
  async coach(message: string, history: CoachTurn[] = []) {
    const apiKey = this.config.get<string>('OPENAI_API_KEY');
    if (apiKey) {
      try {
        return await this.callOpenAi(apiKey, message, history);
      } catch (error) {
        this.logger.warn(`OpenAI call failed, using fallback: ${(error as Error).message}`);
      }
    }
    this.counter += 1;
    return { text: FALLBACK_REPLIES[this.counter % FALLBACK_REPLIES.length] };
  }

  private async callOpenAi(apiKey: string, message: string, history: CoachTurn[]) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: KOCHA_SYSTEM_PROMPT },
          ...history.slice(-10).map((t) => ({
            role: t.role === 'kosta' ? 'assistant' : 'user',
            content: t.text,
          })),
          { role: 'user', content: message },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI responded ${response.status}`);
    }
    const data = (await response.json()) as {
      choices: Array<{ message: { content: string } }>;
    };
    return { text: data.choices[0]?.message?.content ?? FALLBACK_REPLIES[0] };
  }
}
