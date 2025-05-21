export interface PixPayloadProvider {
  gerarPayload(params: PixPayloadParams): Promise<string>;
}

export type PixPayloadParams = {
  nome: string;
  chave: string;
  valor?: string;
  cidade?: string;
  identificacao?: string;
  descricao?: string;
};

export enum PixPayloadProviderKey {
  NATIVE = "NATIVE_PIX_PROVIDER"
}
