// src/core/pix/FazUmPixPayloadProvider.ts
import { injectable } from "tsyringe";
import type { PixPayloadProvider, PixPayloadParams } from "./PixPayloadProvider";
import { PixPayloadProviderKey } from "@/core/pix/PixPayloadProvider";

// Corrige import para CommonJS: require e acesso por string
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fazUmPix = require("faz-um-pix");

@injectable()
export class FazUmPixPayloadProvider implements PixPayloadProvider {
  static providerKey = PixPayloadProviderKey.FAZ_UM_PIX;
  
  async gerarPayload(params: PixPayloadParams): Promise<string> {
    if (typeof fazUmPix.staticPix === "function") {
      return fazUmPix.staticPix({
        merchantName: params.nome,
        merchantCity: params.cidade || "BRASIL",
        pixKey: params.chave,
        transactionAmount: params.valor ? Number(params.valor) : 0.01,
        transactionId: params.identificacao || "***",
        description: params.descricao || "Pagamento Pix",
      });
    } else if (typeof fazUmPix.Pix === "function") {
      return await fazUmPix.Pix(
        params.chave,
        params.nome,
        params.cidade || "BRASIL",
        params.valor ? Number(params.valor) : 0.01,
        params.descricao || "Pagamento Pix"
      );
    }

    const code = fazUmPix.Pix({
      merchantName: params.nome,
        merchantCity: params.cidade || "BRASIL",
        pixKey: params.chave,
        transactionAmount: params.valor ? Number(params.valor) : 0.01,
        transactionId: params.identificacao || "***",
        description: params.descricao || "Pagamento Pix",
    });

    return code;

    throw new Error("Nenhuma função válida encontrada em faz-um-pix");
  }
}
