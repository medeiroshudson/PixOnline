import { User } from "@/types/auth";
import { AuthProvider, AuthProviderKey, AuthResponse, ResetPasswordResponse, SignInParams, SignUpParams, UpdatePasswordResponse } from "./AuthProvider";

export class MockAuthProvider implements AuthProvider {
  static providerKey = AuthProviderKey.MOCK;
  
  private users: Record<string, { email: string; password: string; user: User }> = {
    "test@example.com": {
      email: "test@example.com",
      password: "password123",
      user: {
        id: "mock-user-1",
        email: "test@example.com",
        name: "Test User",
        avatarUrl: "https://via.placeholder.com/150",
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: { role: "admin" }
      }
    }
  };
  
  private currentUser: User | null = null;

  async signIn({ email, password }: SignInParams): Promise<AuthResponse> {
    const userRecord = this.users[email];
    
    if (!userRecord || userRecord.password !== password) {
      return {
        user: null,
        error: "Email ou senha inválidos"
      };
    }

    this.currentUser = userRecord.user;
    
    return {
      user: userRecord.user,
      error: null,
      session: {}
    };
  }

  async signUp({ email, password, userData }: SignUpParams): Promise<AuthResponse> {
    if (this.users[email]) {
      return {
        user: null,
        error: "Email já está em uso"
      };
    }

    const newUser: User = {
      id: `mock-user-${Object.keys(this.users).length + 1}`,
      email,
      name: typeof userData?.name === "string" ? userData.name : null,
      avatarUrl: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      metadata: userData || {}
    };

    this.users[email] = {
      email,
      password,
      user: newUser
    };

    this.currentUser = newUser;
    
    return {
      user: newUser,
      error: null,
      session: {  }
    };
  }

  async signOut(): Promise<void> {
    this.currentUser = null;
    return Promise.resolve();
  }

  async getCurrentUser(): Promise<User | null> {
    return Promise.resolve(this.currentUser);
  }

  async isAuthenticated(): Promise<boolean> {
    return Promise.resolve(!!this.currentUser);
  }

  async resetPassword(email: string): Promise<ResetPasswordResponse> {
    const exists = !!this.users[email];
    
    return {
      success: exists,
      error: exists ? null : "Email não encontrado"
    };
  }

  async updatePassword(password: string): Promise<UpdatePasswordResponse> {
    if (!this.currentUser) {
      return {
        success: false,
        error: "Nenhum usuário autenticado"
      };
    }

    const userEmail = this.currentUser.email;
    if (this.users[userEmail]) {
      this.users[userEmail].password = password;
    }

    return {
      success: true,
      error: null
    };
  }
}
