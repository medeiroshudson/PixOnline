import { PixPayloadProviderKey } from "./pix/PixPayloadProvider";
import { NativePixPayloadProvider } from "./pix/NativePixPayloadProvider";
import { AuthProviderKey } from "./auth/AuthProvider";
import { SupabaseAuthProvider } from "./auth/SupabaseAuthProvider";
import { MockAuthProvider } from "./auth/MockAuthProvider";

// PIX payload providers
export const pixPayloadProviders = {
  [PixPayloadProviderKey.NATIVE]: new NativePixPayloadProvider()
};

// Auth providers
export const authProviders = {
  [AuthProviderKey.SUPABASE]: new SupabaseAuthProvider(),
  [AuthProviderKey.MOCK]: new MockAuthProvider()
};
