// src/core/container.ts
import "reflect-metadata";
import { container } from "tsyringe";
import { PixPayloadProviderKey } from "@/core/pix/PixPayloadProvider";
import type { PixPayloadProvider } from "@/core/pix/PixPayloadProvider";
import { NativePixPayloadProvider } from "@/core/pix/NativePixPayloadProvider";

container.register<PixPayloadProvider>(PixPayloadProviderKey.NATIVE, {
  useClass: NativePixPayloadProvider,
});

export { container };
