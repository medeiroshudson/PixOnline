import { PixPayloadProviderKey } from "./pix/PixPayloadProvider";
import { NativePixPayloadProvider } from "./pix/NativePixPayloadProvider";

export const pixPayloadProviders = {
  [PixPayloadProviderKey.NATIVE]: new NativePixPayloadProvider()
};
