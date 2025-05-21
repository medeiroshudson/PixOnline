import { create } from "zustand";
import type { Pix } from "../types/pix";
import { pixPayloadProviders } from "../core/container";
import { PixPayloadProviderKey } from "../core/pix/PixPayloadProvider";

interface PixState {
  pix: Pix | null;
  payload: string | null;
  setPix: (pix: Pix) => void;
  gerarPayload: () => Promise<void>;
}

export const usePix = create<PixState>((set, get) => ({
  pix: null,
  payload: null,

  setPix: (pix) => set({ pix }),

  gerarPayload: async () => {
    const pix = get().pix;

    if (!pix) {
      set({ payload: null });
      return;
    }

    const pixPayloadProvider = pixPayloadProviders[PixPayloadProviderKey.NATIVE];
    const result = await pixPayloadProvider.gerarPayload(pix);
    
    set({ payload: result });
  },
}));
