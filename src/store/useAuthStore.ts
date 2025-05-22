import { create } from "zustand";
import { User } from "../types/auth";
import { authProviders } from "../core/container";
import { AuthProviderKey } from "../core/auth/AuthProvider";

// Determine which auth provider to use based on environment
const AUTH_PROVIDER_KEY = process.env.NEXT_PUBLIC_AUTH_PROVIDER as AuthProviderKey || 
  (process.env.NODE_ENV === "development" ? AuthProviderKey.MOCK : AuthProviderKey.SUPABASE);

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
  
  // Actions
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, userData?: Record<string, unknown>) => Promise<boolean>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<boolean>;
  updatePassword: (password: string) => Promise<boolean>;
  fetchUser: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => {
  // Initialize the selected auth provider
  const authProvider = authProviders[AUTH_PROVIDER_KEY];
  
  if (!authProvider) {
    console.error(`Auth provider ${AUTH_PROVIDER_KEY} not found. Using mock provider instead.`);
  }
  
  // Use the selected provider or fall back to mock provider
  const provider = authProvider || authProviders[AuthProviderKey.MOCK];
  
  return {
    user: null,
    isLoading: false,
    error: null,
    isInitialized: false,
    
    signIn: async (email, password) => {
      try {
        set({ isLoading: true, error: null });
        
        const response = await provider.signIn({
          email,
          password
        });
        
        if (response.error) {
          set({ error: response.error, isLoading: false });
          return false;
        }
        
        set({ 
          user: response.user,
          isLoading: false,
          error: null
        });
        
        return true;
      } catch (error) {
        set({ 
          error: error instanceof Error ? error.message : "Erro ao fazer login",
          isLoading: false 
        });
        return false;
      }
    },
    
    signUp: async (email, password, userData) => {
      try {
        set({ isLoading: true, error: null });
        
        const response = await provider.signUp({
          email,
          password,
          userData
        });
        
        if (response.error) {
          set({ error: response.error, isLoading: false });
          return false;
        }
        
        set({ 
          user: response.user,
          isLoading: false, 
          error: null 
        });
        
        return true;
      } catch (error) {
        set({ 
          error: error instanceof Error ? error.message : "Erro ao criar conta",
          isLoading: false 
        });
        return false;
      }
    },
    
    signOut: async () => {
      set({ isLoading: true });
      await provider.signOut();
      set({ user: null, isLoading: false });
    },
    
    resetPassword: async (email) => {
      try {
        set({ isLoading: true, error: null });
        
        const { success, error } = await provider.resetPassword(email);
        
        set({ 
          isLoading: false,
          error: error
        });
        
        return success;
      } catch (error) {
        set({ 
          error: error instanceof Error ? error.message : "Erro ao solicitar redefinição de senha",
          isLoading: false 
        });
        return false;
      }
    },
    
    updatePassword: async (password) => {
      try {
        set({ isLoading: true, error: null });
        
        const { success, error } = await provider.updatePassword(password);
        
        set({ isLoading: false, error });
        return success;
      } catch (error) {
        set({ 
          error: error instanceof Error ? error.message : "Erro ao atualizar senha",
          isLoading: false 
        });
        return false;
      }
    },
    
    fetchUser: async () => {
      try {
        set({ isLoading: true, error: null });
        const user = await provider.getCurrentUser();
        
        set({ 
          user,
          isLoading: false,
          isInitialized: true
        });
      } catch (error) {
        set({ 
          user: null,
          error: error instanceof Error ? error.message : "Erro ao buscar usuário",
          isLoading: false,
          isInitialized: true
        });
      }
    }
  };
});

// Initialize auth state
if (typeof window !== 'undefined') {
  useAuth.getState().fetchUser();
}
