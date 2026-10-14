/**
 * Kosta Method — дизайн-система.
 * Тёмная премиум-тема с коралловым акцентом.
 */

export const colors = {
  /** Primary — глубокий тёмно-синий */
  primary: '#1A1A2E',
  /** Accent — коралловый */
  accent: '#E94560',
  /** Background — почти чёрный с синим подтоном */
  background: '#0F0F1A',
  /** Surface — карточки и панели */
  surface: '#1E1E2E',
  /** Surface elevated — модалки, шторки */
  surfaceElevated: '#2A2A3D',

  textPrimary: '#F5F5FA',
  textSecondary: '#A0A0B8',
  textMuted: '#6C6C82',

  border: '#2E2E42',
  borderFocused: '#E94560',

  success: '#3DDC84',
  warning: '#FFB020',
  danger: '#FF4D4D',

  /** Градиенты */
  gradientAccent: ['#E94560', '#C23152'] as const,
  gradientSurface: ['#1E1E2E', '#16162A'] as const,

  overlay: 'rgba(15, 15, 26, 0.85)',
} as const;

export const typography = {
  /** Montserrat Bold — заголовки */
  headingLarge: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 32,
    lineHeight: 38,
  },
  headingMedium: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 24,
    lineHeight: 30,
  },
  headingSmall: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 18,
    lineHeight: 24,
  },
  /** Inter Regular — текст */
  bodyLarge: {
    fontFamily: 'Inter_400Regular',
    fontSize: 17,
    lineHeight: 26,
  },
  body: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    lineHeight: 22,
  },
  bodySmall: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 18,
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 0.4,
    textTransform: 'uppercase' as const,
  },
  button: {
    fontFamily: 'Montserrat_700Bold',
    fontSize: 16,
    lineHeight: 20,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  /** Карточки — 16px */
  card: 16,
  /** Кнопки и инпуты — 12px */
  control: 12,
  /** Чипы и бейджи */
  pill: 999,
} as const;

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  accent: {
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
} as const;

export const theme = { colors, typography, spacing, radius, shadows } as const;

export type Theme = typeof theme;
