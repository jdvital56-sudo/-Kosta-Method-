import React, { useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radius, spacing, typography } from '@/theme';
import { CoachMessage } from '@/types';
import { askKosta } from '@/services/aiCoach';

const QUICK_REPLIES = [
  'Что делать сегодня?',
  'Не могу встать на тренировку 😩',
  'Сколько калорий сжигаем?',
  'Болит спина — что делать?',
];

const WELCOME: CoachMessage = {
  id: 'welcome',
  role: 'kosta',
  text: 'Привет! Я Костя, твой тренер 💪 Спроси меня о чём угодно — плане, технике, питании. Или просто пожалуйся, если сегодня лень — разберёмся вместе!',
  createdAt: new Date().toISOString(),
};

export function KostaScreen() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<CoachMessage[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const listRef = useRef<FlatList<CoachMessage>>(null);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;

    const userMessage: CoachMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
      createdAt: new Date().toISOString(),
    };
    const history = [...messages, userMessage];
    setMessages(history);
    setInput('');
    setThinking(true);

    const replyText = await askKosta(trimmed, history);
    setMessages((prev) => [
      ...prev,
      {
        id: `k-${Date.now()}`,
        role: 'kosta',
        text: replyText,
        createdAt: new Date().toISOString(),
      },
    ]);
    setThinking(false);
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={insets.top + spacing.md}
    >
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.list}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.role === 'kosta' ? styles.kostaBubble : styles.userBubble]}>
            {item.role === 'kosta' && <Text style={styles.avatar}>💪</Text>}
            <Text style={[styles.messageText, item.role === 'user' && styles.userText]}>
              {item.text}
            </Text>
          </View>
        )}
        ListFooterComponent={
          thinking ? (
            <View style={[styles.bubble, styles.kostaBubble]}>
              <Text style={styles.avatar}>💪</Text>
              <Text style={styles.messageText}>Костя печатает…</Text>
            </View>
          ) : null
        }
      />

      <FlatList
        horizontal
        data={QUICK_REPLIES}
        keyExtractor={(q) => q}
        style={styles.quickList}
        contentContainerStyle={styles.quickContent}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable style={styles.quickChip} onPress={() => send(item)}>
            <Text style={styles.quickText}>{item}</Text>
          </Pressable>
        )}
      />

      <View style={[styles.inputRow, { paddingBottom: insets.bottom + spacing.sm }]}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Напиши Косте…"
          placeholderTextColor={colors.textMuted}
          onSubmitEditing={() => send(input)}
          returnKeyType="send"
        />
        <Pressable style={styles.sendButton} onPress={() => send(input)}>
          <Text style={styles.sendText}>→</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.md, gap: spacing.sm },
  bubble: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
    maxWidth: '88%',
  },
  kostaBubble: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.accent,
    borderRadius: radius.card,
    padding: spacing.md,
  },
  userText: { color: '#fff' },
  avatar: { fontSize: 20 },
  messageText: { ...typography.body, color: colors.textPrimary, flexShrink: 1 },
  quickList: { flexGrow: 0 },
  quickContent: { paddingHorizontal: spacing.md, gap: spacing.sm },
  quickChip: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  quickText: { ...typography.bodySmall, color: colors.textSecondary },
  inputRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.control,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textPrimary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    ...typography.body,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: radius.control,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendText: { ...typography.headingSmall, color: '#fff' },
});
