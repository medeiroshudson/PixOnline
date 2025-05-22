import { Session, User } from "@/types/auth";

export interface AuthProvider {
  signIn(params: SignInParams): Promise<AuthResponse>;
  signUp(params: SignUpParams): Promise<AuthResponse>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  isAuthenticated(): Promise<boolean>;
  resetPassword(email: string): Promise<ResetPasswordResponse>;
  updatePassword(password: string): Promise<UpdatePasswordResponse>;
}

export enum AuthProviderKey {
  SUPABASE = "SUPABASE_AUTH_PROVIDER",
  MOCK = "MOCK_AUTH_PROVIDER",
}

export type SignInParams = {
  email: string;
  password: string;
};

export type SignUpParams = {
  email: string;
  password: string;
  userData?: Record<string, unknown>;
};

export type AuthResponse = {
  user: User | null;
  error: string | null;
  session?: Session;
};

export type ResetPasswordResponse = {
  success: boolean;
  error: string | null;
};

export type UpdatePasswordResponse = {
  success: boolean;
  error: string | null;
};
