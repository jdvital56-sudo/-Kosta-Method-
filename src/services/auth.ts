import { apiRequest, setTokenGetter } from '@/services/api';
import { UserProfile } from '@/types';

interface AuthResponse {
  accessToken: string;
  user: UserProfile;
}

let accessToken: string | null = null;

setTokenGetter(() => accessToken);

export async function signIn(email: string, password: string): Promise<UserProfile> {
  const res = await apiRequest<AuthResponse>('/auth/sign-in', {
    method: 'POST',
    body: { email, password },
    auth: false,
  });
  accessToken = res.accessToken;
  return res.user;
}

export async function signUp(email: string, password: string, name: string): Promise<UserProfile> {
  const res = await apiRequest<AuthResponse>('/auth/sign-up', {
    method: 'POST',
    body: { email, password, name },
    auth: false,
  });
  accessToken = res.accessToken;
  return res.user;
}

export async function signOut(): Promise<void> {
  accessToken = null;
}

export function isSignedIn(): boolean {
  return accessToken !== null;
}
