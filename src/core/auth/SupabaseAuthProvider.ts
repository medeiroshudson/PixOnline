import { AuthProvider, AuthProviderKey, AuthResponse, ResetPasswordResponse, SignInParams, SignUpParams, UpdatePasswordResponse } from "./AuthProvider";
import { createClient, User as SupabaseUser, Session as SupabaseSession } from "@supabase/supabase-js";
import { User, Session } from "@/types/auth";

export class SupabaseAuthProvider implements AuthProvider {
  static providerKey = AuthProviderKey.SUPABASE;
  private supabase;

  constructor() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase credentials are missing. Please check your environment variables.");
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async signIn({ email, password }: SignInParams): Promise<AuthResponse> {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return {
          user: null,
          error: error.message
        };
      }      return {
        user: this.mapSupabaseUser(data.user),
        session: this.mapSupabaseSession(data.session),
        error: null
      };
    } catch (error) {
      return {
        user: null,
        error: error instanceof Error ? error.message : "Erro ao fazer login"
      };
    }
  }

  async signUp({ email, password, userData }: SignUpParams): Promise<AuthResponse> {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData || {},
        }
      });

      if (error) {
        return {
          user: null,
          error: error.message
        };
      }      return {
        user: data.user ? this.mapSupabaseUser(data.user) : null,
        session: this.mapSupabaseSession(data.session),
        error: null
      };
    } catch (error) {
      return {
        user: null,
        error: error instanceof Error ? error.message : "Erro ao criar conta"
      };
    }
  }

  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data } = await this.supabase.auth.getUser();
      if (!data.user) return null;
      
      return this.mapSupabaseUser(data.user);
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const { data } = await this.supabase.auth.getSession();
    return !!data.session;
  }

  async resetPassword(email: string): Promise<ResetPasswordResponse> {
    try {
      const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/dashboard/reset-password`,
      });
      
      return {
        success: !error,
        error: error ? error.message : null
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro ao solicitar redefinição de senha"
      };
    }
  }

  async updatePassword(password: string): Promise<UpdatePasswordResponse> {
    try {
      const { error } = await this.supabase.auth.updateUser({
        password: password
      });
      
      return {
        success: !error,
        error: error ? error.message : null
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erro ao atualizar senha"
      };
    }
  }  private mapSupabaseUser(supabaseUser: SupabaseUser): User {
    return {
      id: supabaseUser.id,
      // Ensure email is never undefined as our User type requires it
      email: supabaseUser.email || '',
      name: supabaseUser.user_metadata?.name || null,
      avatarUrl: supabaseUser.user_metadata?.avatar_url || null,
      createdAt: supabaseUser.created_at ? new Date(supabaseUser.created_at) : undefined,
      updatedAt: supabaseUser.updated_at ? new Date(supabaseUser.updated_at) : undefined,
      metadata: supabaseUser.user_metadata || {},
    };
  }
  
  private mapSupabaseSession(supabaseSession: SupabaseSession | null): Session | undefined {
    if (!supabaseSession) return undefined;
    
    return {
      access_token: supabaseSession.access_token,
      refresh_token: supabaseSession.refresh_token,
      expires_at: supabaseSession.expires_at,
      user: supabaseSession.user ? this.mapSupabaseUser(supabaseSession.user) : undefined
    };
  }
}
