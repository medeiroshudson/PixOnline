import { NativePixPayloadProvider } from "@/core/pix/NativePixPayloadProvider";
import { PixPayloadProviderKey } from "@/core/pix/PixPayloadProvider";

export const pixPayloadProviders = {
  [PixPayloadProviderKey.NATIVE]: new NativePixPayloadProvider()
};
